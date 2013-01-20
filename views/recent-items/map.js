function(doc) {
  if (doc.created_at) {
      emit(doc.created_at, {
        color:doc.color.length > 6 ? doc.color.substring(1) : doc.color
      });
  }
};