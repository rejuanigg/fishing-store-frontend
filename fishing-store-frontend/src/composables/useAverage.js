export function useAverage(califications){

  if(califications !== undefined && califications !== null){
    if(califications.length>0){
    const average = califications.reduce((acc, item) => acc + Number(item.score), 0) / califications.length
    return {average}
  }

    else{
      const average = 0;
      return {average};
    }
  }
    else{
      const average = 0;
      return {average};
    }

}

