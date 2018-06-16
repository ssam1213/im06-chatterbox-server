// YOUR CODE HERE:

var url = 'http://127.0.0.1:3000/classes/messages';
var friendList = [];
var app = {
  server: 'http://127.0.0.1:3000/classes/messages',
  init: function () {
    $(document).ready(function () {
      app.fetch();
      $(document).on('click', '.chatterBox', function () {
        app.fetch();
      });
      $(document).on('click', '#send', app.send);
      $(document).on('click', ".username", app.clickUser);
      $(document).on('submit', '#send .submit', app.handleSubmit);
      $(document).on('click', '#createRoom', function () {
        var test = prompt('room name??');
        app.renderRoom(test);
      });
      $('#roomSelect').change(app.selectRoom);
    });
  },
  send: function (message) {
    $.ajax({
      type: 'POST',
      url,
      contentType: 'application/json',
      data: JSON.stringify({
        username: message.username || location.search.split('=')[1],
        text: message.text || $('#text').val(),
        roomname: message.roomname || $('#roomSelect option:selected').val(),
        date: new Date()
      }),
      success: () => app.fetch($('#roomSelect option:selected').val()),
    });

  },
  fetch: function () {
    $.ajax({
      type: 'GET',
      url,
      success: (data) => {
        // data = JSON.parse(data);
        console.log(data);
        console.log(typeof data);   
        $('#chats').html('');
        data.forEach(({
          username,
          text,
          roomname,
          date
        }) => {
          if (arguments[0] === undefined) {
            const $p = $(`<p><a id=${username} class="username" href=#>${username}</a>: ${escapeHtml(text)} (${roomname} @${date})</p>`);
            // $p = $p.replace("<","&lt;");
            // $p = $p.str_replace(">","&gt;");
            $('#chats').append($p);
          } else if (arguments[0] === roomname) {
            const $p = $(`<p><a id=${username} class="username" href=#>${username}</a>: ${escapeHtml(text)} (${roomname} @${date})</p>`);
            // $p = $p.replace("<","&lt;");
            // $p = $p.str_replace(">","&gt;");
            $('#chats').append($p);
          }
        });
      },
    });
  },

  clearMessages: function () {
    $('#chats').html('');
  },
  renderMessage: function (message) {
    const $p = $(`<p><a id=${message.username} class="username" href=#>${message.username}</a>: ${escapeHtml(message.text)} (${message.roomname})</p>`);
    // $p = $p.replace("<","&lt;");
    // $p = $p.str_replace(">","&gt;");
    $('#chats').append($p);
  },
  renderRoom: function (room) {
    const $p = $(`<option value=${room}>${room}</option>`);
    // $p = $p.replace("<","&lt;");
    // $p = $p.str_replace(">","&gt;");
    $('#roomSelect').append($p);

  },
  handleUsernameClick: function (userid) {
    $.ajax({
      // GET: url,
      type: 'GET',
      url,
      success: (data) => {
        $('#chats').html('');
        data.forEach(({
          username,
          text,
          roomname,
          date
        }) => {
          if (userid === username) {
            const $p = $(`<p><a id=${username} class="username" href=#>${username}</a>: ${escapeHtml(text)} (${roomname} @${date})</p>`);
            $('#chats').append($p);
          }
        });
      },
    });
  },
  selectRoom: function () {
    if ($('#roomSelect option:selected').val() !== '') {
      alert($('#roomSelect option:selected').val());
      app.fetch($('#roomSelect option:selected').val());
    }
  },
  clickUser: function () {
    var userid = $(this).attr("id");
    var userClass = $(this).attr("class");
    userClass = userClass.split(' ')[1];
    if (userClass !== 'listed' && friendList.indexOf(userid) === -1) {
      if (confirm("추가?")) {
        friendList.push(userid);
        $('#frList').append(`<p><a id=${userid} class="username listed" href=#>${userid}</a></p>`);
        alert('추가');
      } else {
        alert('안해');
      }
    } else {
      app.handleUsernameClick(userid);
    }
  },
  handleSubmit: function () {
    //app.send();
  },
  addFriend: function () {

  },

  roomListing: function () {
    $.ajax({
      // GET: url,
      type: 'GET',
      url,
      success: (data) => {
        $('#chats').html('');
        var roomChild = $('#roomSelect').children();
        data.forEach(({
          username,
          text,
          roomname,
          date
        }) => {
          roomChild = $('#roomSelect').children();
          for (var i = 0; i < roomChild.length; i++) {
            if (roomname !== roomChild[i].value) {
              app.renderRoom(roomname);
            }
          }
        });
      },
    });
  },
};


app.init();
var entityMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;',
  '`': '&#x60;',
  '=': '&#x3D;'
};

function escapeHtml(string) {
  return String(string).replace(/[&<>"'`=\/]/g, function (s) {
    return entityMap[s];
  });
}