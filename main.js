PennController.ResetPrefix(null)

Sequence("experimental-trials")
Template("stimuli.csv", row =>
    newTrial("experimental-trials",
    
        newVar("show-correction-task",'').global() 
        ,
        // display fixation cross
       newCanvas("pre-judgement",800,600)
            .add(250,150,newText("fixation-cross", "+").settings.css("font-size","200px").color("red"))
            .print()
        ,
        newTimer("pre-audio-timer",500)
            .start()
            .wait()
        ,
        // play audio
        newAudio("audio", row.filename)
           .play()
           .wait()
        ,
        getAudio("audio")
            .remove()
        ,
        newTimer("post-audio-time",250)
            .start()
            .wait()
        ,
        getCanvas("pre-judgement")
            .remove()
        ,
        newSelector("judgement-buttons")
        ,
        newCanvas("judgement-task",800,600)
            .add(0,10,newText("ask-judgement", "What do you think of the sentence you just heard?").settings.css("font-size","2em").color("black"))
            .add(20,200,newButton("acceptable","Sounds good :)").selector("judgement-buttons"))
            .add(400,200,newButton("not-acceptable","Doesn't sound right :(").selector("judgement-buttons"))
            .print()
        ,
        getSelector("judgement-buttons")
            .once()
            .wait()
            .log()
        ,
        getButton("not-acceptable")
            .test.clicked()
            .success(getVar("show-correction-task").set(true))
            .failure(getVar("show-correction-task").set(false))
        ,
        getCanvas("judgement-task").remove()
        ,
        newTimer("post-judgdment",3000)
            .start()
            .wait()
        ,
        newCanvas("pre-repetition",800,600)
            .add(250,150,newText("fixation-cross2", "+").settings.css("font-size","200px").color("blue"))
            .print()
    ))