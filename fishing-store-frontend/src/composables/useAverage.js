export function useAverage(califications){

  if(califications.length>0){
    const average = califications.reduce((acc, item) => acc + item.score, 0) / califications.length
    return {average}
  }
  else{
    const average = 0;
    return {average};
  }

}

