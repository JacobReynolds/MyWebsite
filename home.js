//Global variables
var commandList = ['cat', 'clear', 'help', 'ls', 'man', 'ps'];
var ls = 'list all files in the current directory.';
var help = 'list possible terminal commands.';
var cat = 'cat [filename] will print the contents of that file.';
var clear = 'clear all text in the terminal.';
var reverse = 'reverse to the previous section of the page.';
var man = 'describe a file, but you know that already don\'t you?';
var ps = 'list the current processes';
this['hobbies.txt'] = 'I have many hobbies, in these next few sections you will find a couple.';
this['projects.txt'] = 'A couple sections below is a list of some pretty fun projects, more can be found on github.';
this['.unlock.txt'] = 'Type "continue" to unlock the page';
var files = ['hobbies.txt', 'projects.txt']
var allFiles = ['.unlock.txt', 'hobbies.txt', 'projects.txt']
var user = 'root@jakereynolds:~$';
var commandHistory = [];
var pageIndex = 0;
var backgroundColorList = ['#141414', '#7F2F2A', '#66CC76', '#5E2957', '#52A7FF', '#CCC045'];
var commandIndex = -1;

//Detect the current browser for the 'ps' command
var currentBrowser = function () {
    var is_chrome = navigator.userAgent.indexOf('Chrome') > -1;
    var is_explorer = navigator.userAgent.indexOf('MSIE') > -1;
    var is_firefox = navigator.userAgent.indexOf('Firefox') > -1;
    var is_safari = navigator.userAgent.indexOf("Safari") > -1;
    var is_edge = navigator.userAgent.indexOf("Edge") > -1;
    var is_opera = navigator.userAgent.toLowerCase().indexOf("op") > -1;
    if (is_chrome && is_safari && is_edge) {
        is_chrome = false;
        is_safari = false;
    } else if ((is_chrome) && (is_safari)) {
        is_safari = false;
    } else if ((is_chrome) && (is_opera)) {
        is_chrome = false;
    }
    if (is_chrome) {
        return 'Chrome';
    } else if (is_explorer) {
        return 'Internet Explorer';
    } else if (is_firefox) {
        return 'Firefox';
    } else if (is_safari) {
        return 'Safari';
    } else if (is_edge) {
        return 'Edge';
    } else if (is_opera) {
        return 'Opera';
    } else {
        return 'Browser';
    }
}

if (document.all && !document.addEventListener) {
    $('#screwIE').css('display', 'block');
    $('#mobileWarning').remove();
    $('#screenSizeWarning').remove();
    $('#experience').remove();
    $('#fullPage').remove();
    $('#userPage').remove();
}

//Used to delay click until the page is loaded
var allowClick = true;

//Go up the page
function goUp() {
    if (!allowClick)
        return;
    allowClick = false;
    pageIndex--;

    //Gets the current view height of the page
    var height = $('#heightHolder').height();
    //IE uses html, screw IE
    //Gets the current scrolltop of the page
    var top = Math.max($('body').scrollTop(), $('html').scrollTop());

    //Scroll up the page one view height
    $('html, body').animate({
        scrollTop: top - height
    }, {
        duration: 750,
        queue: false
    });

    //If they're in such a hurry to click
    //they can wait a bit
    setTimeout(function () {
        allowClick = true;
    }, 1500);

    //Handle what to do when scrolling to certain pages
    switch (pageIndex) {
    case 0:
        $('#upArrow').animate({
            opacity: 0
        }, 300)
        $("body").animate({
            backgroundColor: backgroundColorList[0]
        }, 1000)
        break;
    case 1:
        $("body").animate({
            backgroundColor: backgroundColorList[1]
        }, 1000);
        setTimeout(function () {
            $('#motorcycle').animate({
                opacity: 0
            }, 1000)
        }, 1000)
        break;
    case 2:
        $("body").animate({
            backgroundColor: backgroundColorList[2]
        }, 1000)
        setTimeout(function () {
            $('#diveText').animate({
                    top: 0,
                }, 2000),
                $('#diveText2').animate({
                    top: 0,
                }, 2000),
                $('#diveText3').animate({
                    top: 0,
                }, 2000)
        }, 1000)
        break;
    case 3:
        $("body").animate({
            backgroundColor: backgroundColorList[3]
        }, 1000)
        break;
    case 4:
        $("body").animate({
            backgroundColor: backgroundColorList[4]
        }, 1000)
        $('#downArrow').animate({
            opacity: 1
        }, 300)
        break;
    }
}

//Go down the page
function goDown() {
    if (!allowClick)
        return;
    allowClick = false;
    pageIndex++

    //Gets the current height of the page
    var height = $('#heightHolder').height();
    //IE uses html, screw IE
    //Gets the current scrolltop of the page
    var top = Math.max($('body').scrollTop(), $('html').scrollTop());

    //Scroll up the page one view height
    $('html, body').animate({
        scrollTop: top + height
    }, {
        duration: 750,
        queue: false
    });

    //If they're in such a hurry to click
    //they can wait a bit
    setTimeout(function () {
        allowClick = true;
    }, 1500);

    //Handle what to do when scrolling to certain pages
    switch (pageIndex) {
    case 1:
        $('#upArrow').css('opacity', '0');
        $('#upArrow').css('display', 'block');
        $('#upArrow').animate({
            opacity: 1
        })
        $("body").animate({
            backgroundColor: backgroundColorList[1]
        }, 1000);
        setTimeout(function () {
            shake($('#cube'));
        }, 1000);
        break;
    case 2:
        $("body").animate({
            backgroundColor: backgroundColorList[2]
        }, 1000);
        setTimeout(function () {
            $('#motorcycle').animate({
                opacity: 1
            }, 1000)
        }, 1000)
        break;
    case 3:
        $("body").animate({
            backgroundColor: backgroundColorList[3]
        }, 1000);
        setTimeout(function () {
            $('#diveText').animate({
                    top: 120
                }, 2000),
                $('#diveText2').animate({
                    top: 330
                }, 2000),
                $('#diveText3').animate({
                    top: 300
                }, 2000)
        }, 1000)
        break;
    case 4:
        $("body").animate({
            backgroundColor: backgroundColorList[4]
        }, 1000);
        break;
    case 5:
        $("body").animate({
            backgroundColor: backgroundColorList[5]
        }, 1000);
        $('#downArrow').animate({
            opacity: 0
        }, 300)
        break;
    }
}


//Shake the given element 4 times
function shake(div) {
    var interval = 100;
    var distance = 10;
    var times = 4;
    var left = div.offset();
    left = left.left;
    for (var iter = 0; iter < (times + 1); iter++) {
        $(div).animate({
            left: ((iter % 2 == 0 ? left + distance : left - distance))
        }, interval);
    } //for                                                                                                              

    $(div).animate({
        left: left
    }, interval);

}


//Jquery initializers
$(document).ready(function () {
    //Check if there is a mobile browser, redirect to mobile page if so
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        $('#screenSizeWarning').css('display', 'none');
        showSimplified(true);
    } else {
        //This does not show the warning, if the screen size is too small the media query will change display to block.
        //Doing this so that the warning does not flash on mobile.
        $('#screenSizeWarning').css('opacity', 1);
    }

    $(window).scroll(function (e) {
        parallaxScroll();
    });

    if ($(window).width() > 850) {
        //Cute little entrance animation
        $('#experience').animate({
            top: -1000
        }, 0)
        $('#experience').animate({
            top: 0,
            opacity: 1
        }, 500)
    } else {
        $('#experience').animate({
            top: 0,
            opacity: 1
        })
    }

    //Browsers have issue resetting scrollTop, so this will do it
    $('html, body').animate({
        scrollTop: 0
    }, 250);

    //Issues with IE showing the input when opacity at 0, so we add it when the section is clicked
    $('#programmer').click(addInput);

    //Make it more realistic, anywhere they click in the terminal will focus the text field.
    $("#terminal").click(function () {
        $("#terminalInput").focus();
    })

    //Give a little bit of dimensions to the rubik's cubes
    function parallaxScroll() {
        var scrolled = $(window).scrollTop();
        $('#cube-parallax').css('top', (0 - (scrolled * .9)) + 'px');
        $('#cube2-parallax').css('top', (0 - (scrolled * .8)) + 'px');
        $('#cube3-parallax').css('top', (0 - (scrolled * .7)) + 'px');
    }

    //Parse and execute a command from the terminal
    function sendCommand(input) {
        var command = input.split(' ')[0];
        var secondary = input.split(' ')[1];
        if ((commandList.indexOf(command) === -1 && command != "continue") && command) {
            replaceInput();
            $("#terminalOutput").append('Invalid command \"' + command + '"<br>type "help" for more options<br>');
            addInput();
        }
        if (input === 'ls -la' || input === 'ls -a' || input === 'ls -all' || input === 'ls -l') {
            printAllFiles();
            return;
        }
        switch (command) {
        case 'ls':
            printFiles();
            break;
        case 'cat':
            if (!secondary)
                break;
            printFile(secondary);
            break;
        case 'continue':
            unlockPage();
            break;
        case 'help':
            printList(commandList);
            break;
        case 'clear':
            clear();
            break;
        case 'man':
            if (secondary)
                man(secondary);
            break;
        case 'ps':
            //The input has issues with multiple spaces, so we use &nbsp;
            replaceInput();
            $("#terminalOutput").append("PID TTY&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;TIME CMD<br>" +
                '6258 pts/1&nbsp;&nbsp;    00:00:00 bash<br>' +
                '7334 pts/1&nbsp;&nbsp;    00:00:00 ps<br>' +
                '8942 pts/1&nbsp;&nbsp;    00:00:00 ' + currentBrowser() + '<br>');
            addInput();

            break;
        }
    }

    //Unlock the page, congratulations!
    function unlockPage() {
        $('#downArrow').css('opacity', '0');
        $('#downArrow').css('display', 'block');
        $('#downArrow').animate({
            opacity: 1
        })
        replaceInput();
        addInput();
    }

    //Print out the description of a command
    function man(input) {
        if (commandList.indexOf(input) > -1) {
            replaceInput();
            $("#terminalOutput").append('"' + input + '"' + '  ' + this[input] + '<br>');
            addInput();
        } else {
            replaceInput();
            $("#terminalOutput").append('"' + input + '"' + '  is not a valid command, try typing "help" for options.<br>');
            addInput();
        }
    }

    //Clear the terminal
    function clear() {
        replaceInput();
        $("#terminalOutput").empty();
        addInput();
    }

    //Print the given file, usually used with "cat"
    function printFile(file) {
        if (this[file]) {
            replaceInput();
            $("#terminalOutput").append(this[file] + '<br>');
            addInput();
        } else {
            replaceInput();
            $("#terminalOutput").append('"' + file + '"' + ' is an invalid file name.  Try typing "ls".<br>');
            addInput();
        }
    }

    //Used for "help", prints the valid terminal commands
    function printList(list) {
        replaceInput();
        list.forEach(function (result) {
            $("#terminalOutput").append(result + '<br>');
        })
        addInput();
    }

    //Used for "ls", prints the files in the current directory
    function printFiles() {
        replaceInput();
        files.forEach(function (file) {
            $("#terminalOutput").append(file + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
        })
        $("#terminalOutput").append('<br>');
        addInput();
    }

    //Used for "ls -a/la/all", prints all files including hidden ones
    function printAllFiles() {
        replaceInput();
        allFiles.forEach(function (file) {
            $("#terminalOutput").append(file + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
        })
        $("#terminalOutput").append('<br>');
        addInput();
    }

    //Remove the input and add the input value to the output field
    function replaceInput() {
        var value = $("#terminalInput").val();
        $("#terminalInput").remove();
        $("#terminalOutput").append(value + '<br>');
    }

    //Add a new input to the terminal
    function addInput() {
        $("#terminalOutput").append(user + ' <input id="terminalInput" spellcheck="false"></input>');
        //Delaying for IE
        //stupid IE
        setTimeout(function () {
            $("#terminalInput").focus();
        }, 10);

        //Add click handlers for terminal input
        $("#terminalInput").keydown(function (e) {
            var command = $("#terminalInput").val();
            if (e.keyCode == 13) {
                sendCommand(command);
                commandHistory.unshift(command);
                commandIndex = -1;
            } else if (e.keyCode == 9) {
                e.preventDefault();
                autoCompleteInput(command);
            } else if (e.keyCode == 38 && commandIndex != commandHistory.length - 1) {
                e.preventDefault();
                commandIndex++;
                $("#terminalInput").val(commandHistory[commandIndex]);
            } else if (e.keyCode == 40 && commandIndex > -1) {
                e.preventDefault();
                $("#terminalInput").val(commandHistory[commandIndex]);
                commandIndex--;
            } else if (e.keyCode == 67 && e.ctrlKey) {
                $("#terminalInput").val(command + '^C');
                replaceInput();
                addInput();
            }
        });
    }

    //Used for tabbing, will complete the valid command
    function autoCompleteInput(command) {
        var command = $("#terminalInput").val();
        var input = $("#terminalInput").val().split(' ');
        var validList = [];
        var fileList = input[0] === 'man' ? commandList : allFiles

        //Display valid options for a given command
        if (input.length === 2 && input[1] != "") {
            fileList.forEach(function (file) {
                if (file.substring(0, input[1].length) === input[1]) {
                    validList.push(file);
                }
            })
            if (validList.length > 1) {
                replaceInput();
                validList.forEach(function (option) {
                    $('#terminalOutput').append(option + '   ');
                })
                $('#terminalOutput').append('<br>');
                addInput();
                $("#terminalInput").val(command);
            } else if (validList.length === 1) {
                $("#terminalInput").val(
                    command +
                    validList[0].substring(input[1].length, validList[0].length));
            }
        } else if (command.length) {
            //Else if there is a command, print/finish all valid commands
            commandList.forEach(function (option) {
                if (option.substring(0, input[0].length) === input[0]) {
                    validList.push(option);
                }
            })
            if (validList.length > 1) {
                replaceInput();
                validList.forEach(function (option) {
                    $('#terminalOutput').append(option + '   ');
                })
                $('#terminalOutput').append('<br>');
                addInput();
                $("#terminalInput").val(command);
            } else if (validList.length === 1) {
                $("#terminalInput").val(
                    command +
                    validList[0].substring(input[0].length, validList[0].length));
            }
        }
    }

});


//Shows the programmer experience page
function showProgrammer() {
    $('#experience').animate({
        opacity: 0
    }, 300);
    setTimeout(function () {
        $('#fullPage').css('opacity', '1');
        $('body').css('height', '650vh');
        $('#experience').remove();
        $("#terminalInput").focus();
        $('#mobileWarning').remove();
    }, 300)
}

//------------------------------------------------------------------------------------------------
//Code for the simplified page

function animateJ() {
    var currentTop = $("#userHeader div:first-child")[0].offsetTop;
    $("#userHeader div:first-child").animate({
        top: '-=' + 20
    }, {
        queue: true,
        duration: 300
    })
    $("#userHeader div:first-child").animate({
        top: '+=' + 20
    }, {
        queue: true,
        duration: 200
    })
    $("#userHeader div:first-child").animate({
        top: '-=' + 12
    }, {
        queue: true,
        duration: 200
    })
    $("#userHeader div:first-child").animate({
        top: '+=' + 12
    }, {
        queue: true,
        duration: 200
    })
    $("#userHeader div:first-child").animate({
        top: '-=' + 3
    }, {
        queue: true,
        duration: 150
    })
    $("#userHeader div:first-child").animate({
        top: '+=' + 3
    }, {
        queue: true,
        duration: 150
    })
}

//Shows the mobile/user page
function showSimplified(isMobile) {
    scrollTo(0, 0);
    $('#mobileWarning').css('display', 'none');
    $('#screenSizeWarning').css('display', 'none');
    $('#experience').animate({
        opacity: 0
    }, 300);
    setTimeout(function () {
        $('#experience').remove();
        $('#userPage').css('display', 'block');
        $('#userPage').css('opacity', '1');
    }, 300)
    $('#fullPage').remove();
    $('body').css('height', 'auto');
    $('body').css('overflow', 'auto');
    $('body').animate({
        backgroundColor: '#fff'
    });

    $('.userLetter').on('mouseenter', function () {
        var horizontal, vertical, randHoriz, randVert;
        horizontal = this.offsetLeft;
        vertical = this.offsetTop;

        var direction = Math.round(Math.random());
        randHoriz = direction ? Math.floor(Math.random() * 101) : -Math.floor(Math.random() * 101);
        direction = Math.round(Math.random());
        randVert = direction ? -Math.floor(Math.random() * 101) : Math.floor(Math.random() * 101);

        $(this).animate({
            top: '+=' + randVert,
            left: '+=' + randHoriz
        }, {
            queue: false,
            duration: 400
        })
    })

    if (!isMobile)
        setTimeout(function () {
            animateJ();
        }, 600)

}