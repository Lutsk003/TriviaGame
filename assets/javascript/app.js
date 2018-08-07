$(document).ready(function(){
  
    // event listeners
    $("#remaining-time").hide();
    $("#start").on('click', trivia.startGame);
    $(document).on('click' , '.option', trivia.guessChecker);
    
  })
  
  var trivia = {
    // trivia properties
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    timer: 20,
    timerOn: false,
    timerId : '',

    questions: {
        q1:'Why are flamingos pink?',
        q2:'How do giraffes give birth?',
        q3:'Is a zebra black with white stripes or white with black stripes?',
        q4:'Which is the only animal not known to ever get sick?',
        q5:'An Orangutan is about as strong as how many men?',
        q6:'How many bugs can an Anteater eat in one day?',
        q7:'How many eyelids do camels have on each eye?',
        q8:'What is the color of insect blood?',
    },

    options: {
        q1: ['They are born that way','The sun','Because they eat shrimp','Interbreeding'],
        q2: ['Standing up','Sitting','Laying down','Upside down'],
        q3: ['White with black stripes','Black with white stripes','Both','Neither'],
        q4: ['Dolphins','Spiders','Turtles','Sharks'],
        q5: ['2','4','6','8'],
        q6: ['1000','15,000','30,000','50,000'],
        q7: ['1','2','3','4'],
        q8: ['Red','Blue','Yellow','Green'],
    },

    answers: {
        q1:'Because they eat shrimp',
        q2:'Standing up',
        q3:'White with black stripes',
        q4:'Sharks',
        q5:'8',
        q6:'30,000',
        q7:'3',
        q8:'Yellow',
    },

    startGame: function(){
        trivia.currentSet= 0;
        trivia.correct = 0;
        trivia.incorrect = 0;
        trivia.unanswered = 0;
        clearInterval(trivia.timerId);

        $('#game').show();
        $('#results').html('');
        $('#timer').text(trivia.timer);
        $('#start').hide();
        $('#remaining-time').show()

        trivia.nextQuestion();    
    },

    nextQuestion: function(){
        trivia.timer = 10;
        $('#timer').removeClass('last-seconds');
        $('#timer').text(trivia.timer);

        if(!trivia.timerOn){
            trivia.timerId = setInterval(trivia.timerRunning, 1000);
        }

        var questionContent = Object.values(trivia.questions)[trivia.currentSet];
        $('#question').text(questionContent);

        var questionOptions = Object.values(trivia.options)[trivia.currentSet];
    
        $.each(questionOptions, function(index, key){
            $('#options').append($('<button class="option btn btn-info btn-lg">' + key + '</button>'));
        })
    },

    timerRunning: function(){
        if (trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length){
            $('#timer').text(trivia.timer);
            trivia.timer --;
            if(trivia.timer === 4){
                $('#timer').addClass('last-seconds');
            }
        }
        else if (trivia.timer === -1){
            trivia.unanswered ++;
            trivia.result = false;
            clearInterval(trivia.timerId);
            resultId = setTimeout(trivia.guessResult, 1000);
            $('#results').html('<h3>Out of time! the answer was ' + Object.values(trivia.answers)[trivia.currentSet] + '</h3>'); 
        }

        else if (trivia.currentSet === Object.keys(trivia.questions).length){
            $('#results')
            .html('<h3>Thanks for playing!</h3>' + 
            '<p>Correct: ' + trivia.correct + '</p>' +
            '<p>Incorrect: ' + trivia.incorrect + '</p>' +
            '<p>Unanswered: ' + trivia.unanswered + '</p>' +
            '<p>Please play again!</p>');

            $('#game').hide();
            $('#start').show()
        }
    },

    guessChecker: function(){
        var resultId;

        var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];

        if($(this).text() === currentAnswer){
            $(this).addClass('btn-success').removeClass('btn-info')

            trivia.correct ++;
            clearInterval(trivia.timerId);
            resultId = setTimeout(trivia.guessResult, 1000);
            $('#results').html('<h3>Correct Answer!</h3>');
        }
        else{
            $(this).addClass('btn-danger').removeClass('btn-info');

            trivia.incorrect++;
            clearInterval(trivia.timerId);
            resultId = setTimeout(trivia.guessResult, 1000)
            $('#results').html('<h3>Oops! Answer was: ' + currentAnswer + '</h3>');
        }
    },

    guessResult: function(){
        trivia.currentSet ++;

        $('.option').remove();
        $('#results h3').remove();

        trivia.nextQuestion();
    }


}