

export const dynamic_price =(Startat,EndAt, price, merbeship='') =>{
    const start = new Date(Startat);
  const end = new Date(EndAt);

  const hours = (end - start) / (1000 * 60 * 60);

  let total = hours * price;
  let discount = 0;

  const day = start.getDay(); // 0 Domingo, 6 Sábado
  const hour = start.getHours();

  // Regla 1: noches o fines de semana = -20%
  const isWeekend = day === 0 || day === 6;
  const isNight = hour >= 18; // después de 6pm

  if (isWeekend || isNight) {
    discount += 0.20; 
  }

  //  Regla 2: Reserva 8+ horas = -15%
  if (hours >= 8) {
    discount += 0.15;
  }

  //  Regla 3: Usuario enterprise = -10%
  if (merbeship =='Enterprise') {
    discount += 0.10;
  }
   const totalFinal = total - (total * discount);
  return totalFinal;
}