function(doc) {
  if(doc.color){
    emit(doc.id,1);
  }  
}