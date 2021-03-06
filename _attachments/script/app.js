// Apache 2.0 J Chris Anderson 2011
$(function() {   
    // friendly helper http://tinyurl.com/6aow6yn
    $.fn.serializeObject = function() {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function() {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };

    // var path = unescape(document.location.pathname).split('/'),
    //     design = path[3],
    //     db = $.couch.db(path[1]);

    var design = "app",
        db = $.couch.db("samedifference");
    function drawItems() {
        db.view(design + "/recent-items", {
            descending : "true",
            limit : 50,
            update_seq : true,
            success : function(data) {
                setupChanges(data.update_seq);
                var them = $.mustache($("#recent-messages").html(), {
                    items : data.rows.map(function(r) {return r.value;})
                });
                $("#items").prepend(them);
            }
        });
    };
    drawItems();
    var changesRunning = false;
    function setupChanges(since) {
        if (!changesRunning) {
            var changeHandler = db.changes(since);
            changesRunning = true;
            changeHandler.onChange(drawItems);
        }
    }
    
    // //$("#input").html($.mustache($("#new-message").html()));
    
    // function setColor(){
    //   var colors = [
    //         "#8AB692",
    //         "#5685A1",
    //         "#46A198",
    //         "#57907D",
    //         "#8DB1A7",
    //         "#83A1A3",
    //         "#ACC9CD",
    //         "#75A5B1",
    //         "#688D97"
    //       ];

    //   //simple random by size of list
    // }
    // setColor();

 });
