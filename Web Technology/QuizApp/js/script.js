$(document).ready(function () {
    let index = -1;
    let userScore = 0;
    $(".info_box").hide();
    $(".quiz_box").hide();
    $(".option").hide();
    $("footer button").hide();
    $(".result_box").hide();

    // On Clicking Start Button
    $(".start_btn").click(function () {
        $(this).hide();
        $(".info_box").show();
    });

    //On Clicking Exit Button
    $(".quit").click(function () {
        $(".info_box").hide();
        $(".start_btn").show();
    });

    //On clicking Continue Button
    $(".restart,.next_btn").click(function () {
        $(".info_box").hide();
        $(".result_box").hide();
        $(".option_list").css("pointer-events", "auto");
        index++;
        $("body").css("background-color", "#C7CEEA");
        $("footer button").hide();
        $(".quiz_box").show();

        if (index == questions.length) {
            $(".quiz_box").hide();
            $(".result_box").show();
            if (userScore > 3) { // if user scored more than 3
                //creating a new span tag and passing the user score number and total question number
                let scoreTag = '<span>and congrats! 🎉, You got <p>' + userScore + '</p> out of <p>' + questions.length + '</p></span>';
                $('.score_text').html(scoreTag);  //adding new span tag inside score_Text
            }
            else if (userScore > 1) { // if user scored more than 1
                let scoreTag = '<span>and nice 😎, You got <p>' + userScore + '</p> out of <p>' + questions.length + '</p></span>';
                $('.score_text').html(scoreTag);
            }
            else { // if user scored less than 1
                let scoreTag = '<span>and sorry 😐, You got only <p>' + userScore + '</p> out of <p>' + questions.length + '</p></span>';
                $('.score_text').html(scoreTag);
            }
            index = -1;
            userScore = 0;
        }


        //Displaying Question
        $(".que_text").text(questions[index].numb + ". " + questions[index].question);

        //Displaying Options
        $(".option_list").html('<div class="option"><span>' + questions[index].options[0] + '</span></div>'
            + '<div class="option"><span>' + questions[index].options[1] + '</span></div>'
            + '<div class="option"><span>' + questions[index].options[2] + '</span></div>'
            + '<div class="option"><span>' + questions[index].options[3] + '</span></div>');


        // Showing Total Questions
        $(".total_que").text((index+1)+" of "+questions.length+" Questions")

        // Selecting Option
        $(".option").click(function () {
            $(".option_list").css("pointer-events", "none");
            let selectedAns = $(this).text();
            let correctAns = questions[index].answer;
            $(this).css("background-color", "#007bff");
            if (selectedAns == correctAns) {
                userScore++;
                $("body").css("background-color", "	#4F7942");
            }
            else {
                $("body").css("background-color", "#8B0000");
                for (i = 0; i < 4; i++) {
                    let selectTemp = $(".option").eq(i).text();
                    if (selectTemp == correctAns) {
                        $(".option").eq(i).css("background-color", "#46782f");
                    }
                }
            }
            // Next button loads after user selects answer
            $("footer button").show();
        });

    });

    $(".quit").click(function () {
        window.location.reload(); //reload the current window
    });


});