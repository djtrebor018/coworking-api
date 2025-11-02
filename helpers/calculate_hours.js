

export const time_calculator =(Starat,EndAt)=>{

const h1 = new Date(Starat)
const h2 = new Date(EndAt)
  
return (h2-h1)/(1000*60*60)

}