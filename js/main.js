var values = {};


function createIPA_word(text) {
x = DICT[text];
if (x!=undefined) {
return x
}else{
return "?"
}
}


function createIPA_sentence(line){

// Convert line into list of objects of words
  processed_line = line;
  processed_line = word_from_string(line);
  
  // process line to create IPA
  for(word in processed_line){
    console.log("IPA process:", processed_line[word]);
    processed_line[word].IPA = createIPA_word(processed_line[word].word.toLowerCase());
  }
console.log(processed_line);
return processed_line;

// Should return list of object, where object contains IPA property

};


function word_from_string(string) {
  console.log("input string", string);

  word_count = 0;
  word = "";
  word_list = [];

  for(i in string){
    if(string[i]!=" "){
      word+=string[i];

      if(i == string.length-1){
        word_list[word_count] = {word};
        word_count += 1;
        word = "";

      }
    }
    else{
     word_list[word_count] = {word};
      word_count += 1;
      word = "";
    }
  }
  console.log(word_list);
  return word_list;
// Sample Returns: Returns a list with objects
// [{word: "fly"}, {word: "by"}, {word: "me"}]
}



// VISUALIZERSSSS
// Decodes list of objects into IPA
function decodeIPA(word_list) {
  viz = "";

  for(word in word_list){
    viz += word_list[word].IPA[0];
    viz += "|";
  }

  return viz;
}



// pending
function IPA_to_meter(word_list) {

  // Is stress = /

  for(word in word_list){

  }

  // else = -

}








// [{word: "This", IPA: ["dh ih1 s", "dh ih0 s"]}, {word: "is", IPA: ["ih1 z", "ih0 z"]}, {word: "some", IPA: ["s ah1 m"]}, {word: "poetry", IPA: ["p ow1 ah0 t r iy0"]}] (4)





function annotation_from_sentence(sentence){
  str = " ";

  for(phone in sentence){
    str += annotation_from_word(sentence[phone].IPA[0]);
    str+= " | ";
  }

  str = str.replace(/,/g,"  ");

  console.log("fuck",str,typeof(str));



  return str
}


function annotation_from_word(word) {
  str = word;
  console.log("str",str);
  stringArray = str.split(/(\s+)/);
  console.log("stringArray",stringArray);

  clean_array = remove_from_array(" ",stringArray);
  
  for(phone in clean_array){
    clean_array[phone] =  indentify_phones( clean_array[phone]);
  }

  

  return clean_array;

}

function indentify_phones(phone) {

  if (PHONES[phone]!=undefined) {
    return null;
  }
  else{ 
    stress = phone[phone.length-1];
    console.log(stress);

    if(stress == 1){return "/"}
    if(stress == 2){return "/"}
    if(stress == 0){return "-"}
  } 
}

function space_to_vertical_line(line){
  str = line;
  str = str.replace(/ /g,"  |  ");
  return str;
}







// When you click on the button

$( "#submitButton" ).click(function() {
// Exract value from form
$.each($('#myForm').serializeArray(), function(i, field) {
values[field.name] = field.value;
});

// Process
line = values.fname
line_with_IPA = createIPA_sentence(line);

// Output results onto line below
$("#line-1-1").text(decodeIPA(line_with_IPA));
$("#line-1-2").text(annotation_from_sentence(line_with_IPA));
$("#line-1-3").text(space_to_vertical_line(line));
});









// Helper functions
function containsNumber(str) {
  return /[0-9]/.test(str);
}

function remove_from_array(x,arr) {
    for( var i = 0; i < arr.length; i++){ 

      if ( arr[i] === x) { 

          arr.splice(i, 1); 
      }
}
return arr;

}

