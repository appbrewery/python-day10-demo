//Current line
var CurrentId = undefined;

var inputValues = [];
const inputPrompts = [
  `+
-
*
/
Pick an operation: `,
  "What's the next number?: ",
];

const logo = `
 _____________________
|  _________________  |
| | Pythonista   0. | |  .----------------.  .----------------.  .----------------.  .----------------. 
| |_________________| | | .--------------. || .--------------. || .--------------. || .--------------. |
|  ___ ___ ___   ___  | | |     ______   | || |      __      | || |   _____      | || |     ______   | |
| | 7 | 8 | 9 | | + | | | |   .' ___  |  | || |     /  \\     | || |  |_   _|     | || |   .' ___  |  | |
| |___|___|___| |___| | | |  / .'   \\_|  | || |    / /\\ \\    | || |    | |       | || |  / .'   \\_|  | |
| | 4 | 5 | 6 | | - | | | |  | |         | || |   / ____ \\   | || |    | |   _   | || |  | |         | |
| |___|___|___| |___| | | |  \\ '.___.'\\  | || | _/ /    \\ \\_ | || |   _| |__/ |  | || |  \\ '.___.'\\  | |
| | 1 | 2 | 3 | | x | | | |   '._____.'  | || ||____|  |____|| || |  |________|  | || |   '._____.'  | |
| |___|___|___| |___| | | |              | || |              | || |              | || |              | |
| | . | 0 | = | | / | | | '--------------' || '--------------' || '--------------' || '--------------' |
| |___|___|___| |___| |  '----------------'  '----------------'  '----------------'  '----------------' 
|_____________________|
`;

//Click Run
$(document).ready(function () {
  $("#run-button").click(function () {
    $("#Content").empty();
    restart();
  });
});

function restart() {
  inputValues = [];
  accucumulator = 0;
  n2 = 0;
  operation = 0;
  NewLine(logo, false);
  NewLine("What's the first number?: ", true);
}
let n2 = 0;
let accucumulator = 0;
let operation;
const operations = ["+", "-", "*", "/"];
//Enter button
$(document).on("keydown", function (e) {
  var x = event.which || event.keyCode;
  if (x === 13 || x == 13) {
    var consoleLine = $("#" + CurrentId + " input").val();
    inputValues.push({ id: CurrentId, val: consoleLine });

    if (inputValues.length == 1) {
      accucumulator = Number(consoleLine);
      $(".console-carrot").remove();
      NewLine(inputPrompts[0], true);
    }

    if (
      inputValues.length == 2 ||
      (inputValues.length > 4 && (inputValues.length + 1) % 3 == 0)
    ) {
      operation = operations.indexOf(consoleLine.trim());

      $(".console-carrot").remove();
      NewLine(inputPrompts[1], true);
    }

    if (
      inputValues.length == 3 ||
      (inputValues.length > 4 && inputValues.length % 3 == 0)
    ) {
      n2 = Number(consoleLine);
      $(".console-carrot").remove();
      let result = 0;
      switch (operation) {
        case 0:
          result = accucumulator + Number(n2);
          break;
        case 1:
          result = accucumulator - Number(n2);
          break;
        case 2:
          result = accucumulator * Number(n2);
          break;
        case 3:
          result = accucumulator / Number(n2);
          break;
        default:
          break;
      }

      NewLine(
        `${
          accucumulator % 1 == 0 ? String(accucumulator + ".0") : accucumulator
        } ${operations[operation]} ${n2 % 1 == 0 ? String(n2 + ".0") : n2} = ${
          result % 1 == 0 ? String(result + ".0") : result
        }`,
        false
      );
      accucumulator = result;
      NewLine(
        `Type 'y' to continue calculating with ${
          accucumulator % 1 == 0 ? String(accucumulator + ".0") : accucumulator
        }, or type 'n' to start a new calculation: `,
        true
      );
    }

    if (
      inputValues.length == 4 ||
      (inputValues.length > 4 && (inputValues.length - 1) % 3 == 0)
    ) {
      if (consoleLine == "y") {
        NewLine(inputPrompts[0], true);
      } else {
        $("#Content").empty();
        restart();
      }
    }

    // $(".console-carrot").remove();
    // if (biddingShouldContinue) {
    //   NewLine(inputPrompts[inputValues.length - 1], true);
    // }
  }
});
$(document).on("keydown", function (e) {
  var x = event.which || event.keyCode;
  var line = $("#" + CurrentId + " input");
  var length = line.val().length;
  if (x != 8) {
    line.attr("size", 1 + length);
  } else {
    line.attr("size", length * 0.95);
  }
  if (length === 0) {
    $("#" + CurrentId + " input").attr("size", "1");
  }
});
$(document).on("click", function (e) {
  $("#" + CurrentId + " input").focus();
});

//New line
function NewLine(text, isPrompt) {
  $(".console-carrot").remove();
  if (CurrentId !== undefined) {
    $("#" + CurrentId + " input").prop("disabled", true);
  }
  CurrentId = "consoleInput-" + GenerateId();

  if (isPrompt) {
    $("#Content").append(
      //One Line
      '<div id="' +
        CurrentId +
        '">' +
        text +
        '<input autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" type="text" class="terminal-input" /><div class="console-carrot"></div></div>'
    );
    $("#" + CurrentId + " input").focus();
    $("#" + CurrentId + " input").attr("size", "1");
  } else {
    $("#Content").append('<div id="' + CurrentId + '">' + text + "</div>");
  }
  document.getElementById(CurrentId).scrollIntoView();
}

function find_highest_bidder(bidding_record) {
  let highest_bid = 0;
  let winner = "";
  for (bidder in bidding_record) {
    let bid_amount = bidding_record[bidder].amount;
    if (bid_amount > highest_bid) {
      highest_bid = bid_amount;
      winner = bidding_record[bidder].name;
    }
  }
  return `The winner is ${winner} with a bid of \\$${highest_bid}`;
}

function GenerateId() {
  return Math.random().toString(16).slice(2);
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
