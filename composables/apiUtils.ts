import { useMain } from "~/stores/common";
import { useAuthStore } from "~/stores/auth";
import { ElNotification } from "element-plus";

const runtimeConfig = useRuntimeConfig();

export async function downloadFile(file: string ) {
  const authStore = useAuthStore();

  await fetch(`${runtimeConfig.public.BASE_URL + file}`, {
    headers: {
      Authorization: `Bearer ${authStore.token}`,
    },

  })
    .then(async (response) => {
      const fileName = response.headers
        .get("content-disposition")
        ?.split(";")
        .find((n) => n.includes("filename="))
        .replace("filename=", "")
        .trim()
        .split(".")[0];
      console.log(response, "response");
      if (response.status !== 200) {
        ElNotification({
          title: "Error",
          type: "error",
          message: response.statusText,
        });
        throw new Error("Error downloading file");
      } else {
        return { blob: await response.blob(), name: fileName };
      }
    })
    .then(({ blob, name }) => {
      console.log(name, "name");
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = name ? name : file.split("/")[1];
      a.click();
      URL.revokeObjectURL(url);
    })
    .catch((error) => {
      console.log(error);
    });
}

export function uploadFile(params: any) {
return new Promise((resolve, reject) => {
  
    const file = params.file as File;
    const extension = file.name.slice(file.name.lastIndexOf("."));
    let fileName = `File-${new Date().getTime()}${extension}`;
    const myRenamedFile = new File([file], fileName, { type: file.type });

    useAsyncGql("generateUploadLink", {
      model: "BLOG_COVER",
      fileName: fileName,
      contentType: file.type,
      sizeInBytes: file.size,
    })
      .then(async ({ data }) => {
        const link = data.value?.generateUploadLink.data;
        try {
          const response = await $fetch(link, {
            method: "PUT",
            body: myRenamedFile,
          });
          const filereturned = link
            ?.split("?")[0]
            .split(runtimeConfig.public.BUCKET_URL)[1];
          console.log(
            filereturned,
            runtimeConfig.public.BUCKET_URL,
            "file returned"
          );
          resolve(filereturned);
        } catch (error) {
          reject(error);
        }
        
      })
      .catch((error) => {
        ElNotification({
          title: "Error",
          type: "error",
          message: error,
        });
        
        reject(error);
      });
  });
}

export function getStatusColor(status: string) {
  switch (status) {
   
    case "DELETED":
      return "red";
    case "BLOCKED":
      return "brown";

    case "OPEN":
      return "primary";
    case "ACTIVE":

      return "green";
  }
}
export function getName(data: string) {
  if (!data) {
    return "";
  }
  if (data.localizedLastName) {
    return `${data.localizedFirstName} ${
      data.localizedLastName ? data.localizedLastName : ""
    }  `;
  } else if (data.enFullName) {
    return data.enFullName;
  } else {
    return "";
  }
}

export function formatNumber(num: number) {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + "B";
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
}

export function checkAppointmentType(type: string) {
  switch (type) {
    case "SCHEDULED":
      return "#FFCE0E";
    case "URGENT":
      return "#E56461";
    case "FOLLOW_UP":
      return "#27AE60";
    case "FREE":
      return "#5789e3";
    default:
      return "#1ED8D6";
  }
}
export function checkPaymentType(type: string) {
  switch (type) {
    case "APPLE_PAY":
      return "/images/payment/applepay.svg";
    case "AMERICAN_EXPRESS":
      return "/images/payment/americanExpress.svg";
    case "VISA":
      return "/images/payment/visa.svg";
    case "MASTERCARD":
      return "/images/payment/mastercard.svg";
    case "MAESTRO":
      return "/images/payment/maestro.svg";
    case "WALLET":
    case "SYSTEM":
      return "/images/payment/wallet.svg";
    case "MADA":
      return "/images/payment/mada.svg";
  }
}
export function getRequestStatus(status: string) {
  switch (status) {
    case "PENDING_DATA_REVIEW":
      return { name: "To be reviewed", color: "#f1ca32" };
    case "UPDATE_SFHSC_REGISTERATION_NUMBER":
      return { name: "SCFHS No. update ", color: "#f1ca32" };
    case "SENT":
      return { name: "Contract sent", color: "#159998" };
    case "RECEIVED":
      return { name: "Contract signed", color: "#239E57" };
    case "REJECTED":
    case "NOT_SENT":
      return { name: "Rejected", color: "#d1615f" };
    case "UPDATE_CLASSIFICATION":
      return { name: "Classification update", color: "#d1615f" };

    case "ACCEPTED":
      return { name: "Accepted", color: "#3dd388" };
    case "REJECTED_BY_CONSULTANT":
      return { name: "Rejected by provider", color: "#db5b1a" };
  }
}

export function getErrorCode(code: number, message: string | null | undefined) {
  if (code === 600) {
    navigateTo("/login");
  } else if (code > 200) {
    throw createError({
      statusCode: code,
      statusMessage: message || "",
      fatal: true,
    });
  }
}
