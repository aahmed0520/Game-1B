class Start extends Scene {
    create() {
        this.engine.setTitle(this.engine.storyData.Title); // TODO: replace this text using this.engine.storyData to find the story title
        this.engine.addChoice("Begin the story");
    }

    handleChoice() {
        this.engine.gotoScene(Location, this.engine.storyData.Locations.Start); // TODO: replace this text by the initial location of the story
    }
}

class Location extends Scene {
    create(key) {
        let locationData = key; // TODO: use `key` to get the data object for the current story location
        this.engine.show(locationData.Body); // TODO: replace this text by the Body of the location data
        
        if(locationData.Choices) { // TODO: check if the location has any Choices
            for(let choice of locationData.Choices) { // TODO: loop over the location's Choices
                console.log("Here is choice:");
                console.log(choice);
                this.engine.addChoice(choice.Text, choice); // TODO: use the Text of the choice
                // TODO: add a useful second argument to addChoice so that the current code of handleChoice below works
            }
        }
        else if (locationData.Body == "You picked up the matches") {
            matchbox = matchbox + 1;
            console.log(matchbox);
            this.engine.gotoScene(Location, this.engine.storyData.Locations["Look around the room"]);
        }
        else if (locationData.Body == "You picked up the key") {
            this.engine.gotoScene(Location, this.engine.storyData.Locations["Look around the room"]);
            goldkey = goldkey + 1;
        }
        else if (locationData.Body == "Here is a picture of you with some child. You turn the picture over and see a message saying, \"Ill find you\"") {
            this.engine.gotoScene(Location, this.engine.storyData.Locations["Look around the room"]);
        }
        else if (locationData.Body == "Here is a book titled right or wrong.....") {
            this.engine.gotoScene(Location, this.engine.storyData.Locations["Look around the room"]);
        }
        else if (locationData.Body == "Radio is Off") {
            this.engine.gotoScene(Location, this.engine.storyData.Locations["Radio"]);
        }

        else if (locationData.Body == "Lighting the Match") {
            if (matchbox != 0){
                this.engine.gotoScene(Location, this.engine.storyData.Locations["Light the Match"]);
            }
            if (matchbox == 0){
                this.engine.show("<hr>");
                this.engine.show("You didnt pick up the matches");
                this.engine.gotoScene(Location, this.engine.storyData.Locations["Door 1"]);
            }
        }
        else if (locationData.Body == "The door is locked") {
            if (goldkey != 0){
                console.log(goldkey);
                console.log("yes");
                this.engine.gotoScene(Location, this.engine.storyData.Locations["Open up the door"]);
            }
            if (goldkey == 0){
                console.log(goldkey);
                console.log("no");
                this.engine.show("<hr>");
                this.engine.show("You dont have a key!");
                this.engine.gotoScene(Location, this.engine.storyData.Locations["Door 3"]);
            }
        }  
        else if (locationData.Body == "Turn up volume") {
            if (radionum == 0){
                radionum = radionum + 1;
                this.engine.show("Welcome to 99.5 fm...you...");
                this.engine.gotoScene(Location, this.engine.storyData.Locations["Radio"]);
            }
            else if (radionum == 1){
                radionum = radionum + 1;
                this.engine.show("Welcome to 101.4 fm...will....");
                this.engine.gotoScene(Location, this.engine.storyData.Locations["Radio"]);
            }
            else if (radionum == 2){
                radionum = radionum + 1;
                this.engine.show("Welcome to  94.5 fm...never.....");
                this.engine.gotoScene(Location, this.engine.storyData.Locations["Radio"]);
            }
            else if (radionum == 3){
                radionum = 0;
                this.engine.show("Welcome to 106.1 fm...ESCAPE......");
                this.engine.gotoScene(Location, this.engine.storyData.Locations["Radio"]);
            }
        }
    }

    handleChoice(choice) {
        if(choice) {
            this.engine.show("&gt; "+choice.Text);
            this.engine.gotoScene(Location, this.engine.storyData.Locations[choice.Target]);
        } else {
            this.engine.gotoScene(End);
        }
    }
}

class End extends Scene {
    create() {
        console.log("In End.create()");
        this.engine.show("<hr>");
        this.engine.show(this.engine.storyData.Credits);
    }
}

var matchbox = 0;
var goldkey = 0;
var radionum = 0;
Engine.load(Start, 'myStory.json');