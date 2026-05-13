export function useFormatDate(value) {

  if (!value) return '';

  try {
    //Le damos un formato que entienda js
    const dateString = String(value).trim().replace(' ', 'T') + 'Z';
    //Creamos la nueva fecha con la fecha seteada
    const date = new Date(dateString);

    //Ahora, si al pasar la fecha seteada a los ms desde 1970, y le verificamos si es valido. Previene mucho errores
    if (isNaN(date.getTime())) {
      return 'Fecha inválida';
    }

    //Acá setea todo a un string cambiando uno por uno los parametros para que finalmente se convierta en una fecha de Argentina
    return date.toLocaleString('es-AR', {
      timeZone: 'America/Argentina/Buenos_Aires',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });

  } catch (e) {
    //Previene que haya errores
    return 'Error de formato';

  }

}
