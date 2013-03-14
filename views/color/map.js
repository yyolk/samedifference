function(doc) {
 if(doc.color){
  emit(doc._id, doc.color);
}
}