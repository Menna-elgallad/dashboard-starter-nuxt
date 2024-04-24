import {fluid} from "./createFluid"
module.exports = {
  
  theme: {
    extend: {
    
      colors: {
        "primary": {DEFAULT : "#3B1437"},
   
      },
      spacing: {
        'main': '24px',
        'secondary': '16px',
      },
      fontSize: {
        'xxs':'calc(8px + 0.15vw)', 
        'xs':'calc(10px + 0.20vw)', 
        'sm':'calc(12px + 0.25vw)',
        'md':'calc(14px + 0.4vw)', 
        'lg':'calc(16px + 0.6vw)', 
        'xl':'calc(18px + 0.8vw)', 
        '2xl':'calc(20px + 1vw)', 
        '3xl':'calc(22px + 1.2vw)',
      
      }
    },
  },
  plugins: [],
}

