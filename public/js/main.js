$(function () {
    function theme(theme) {
        let icon = '<i class="fas fa-sun"></i>';
        if (theme == 'light') icon = '<i class="fas fa-moon"></i>';

        $('#theme-change').html(icon);
        $('body').attr('data-theme', theme);
        localStorage.setItem('theme', theme);
    }

    let current = localStorage.getItem('theme') || 'dark';
    if (current == 'dark' || current == 'light') theme(current);
    else theme('dark');

    $('#theme-change').on('click', function () {
        let current_theme = localStorage.getItem('theme') || 'dark';
        if (current_theme == 'dark') {
            theme('light');
        } else if (current_theme == 'light') {
            theme('dark');
        } else {
            theme('dark');
        }
    });
});;

function showGuildSettings(data) {
    $.ajax({
        url: '/show_guild_form',
        method: 'POST',
        data: JSON.parse(data),
        success: function (data) {
            $('#guildSettingsModal').html(data);
            $('.select2').select2({
                dropdownParent: $('#select2parent'),
                placeholder: "Select a role"
            });

            let guildSettingsModalbs = new bootstrap.Modal(document.getElementById('guildSettingsModal'));
            guildSettingsModalbs.show();
        }
    });
}

function submit(guild_id, partnerGuildId) {
    const data = {
        guild_id,
        partnerGuildId,
        default_cooldown: $("#default_cooldown")[0].value,
        pings: $.map($('.select2').find(':selected'), function (val, i) {
            return { name: val.text, roleId: val.value }
        }),
        blacklisted: $('#blacklisted').is(':checked'),
        delete: $("#delete").is(":checked"),
        cooldown_left: $("input#cooldown-left")[0].value === "0" ? 0 : null,
    }

    $.ajax({
        url: '/save_guild_form',
        method: 'POST',
        data,
        success: function (data) {
            $('#guildSettingsModal').modal('hide')
            location.reload()
        }
    })

}

let form = document.getElementById('settings');

function save(id) {
    let invite_link = form.elements['invite_link'].value

    if (invite_link) {
        $.ajax({
            url: 'https://discordapp.com/api/invite/' + invite_link.split("/")[invite_link.split("/").length - 1],
            method: 'GET',
            timeout: 5000,
            success: function (data) {
                form.submit()
            },
            error: function () {
                var notyf = new Notyf();
                notyf.error('You must provide the valid invite link.');
            }
        })
    } else {
        form.submit()
    }
}

function showModal(el) {
    let modal = new bootstrap.Modal(document.getElementById(el));
    $('.select2').select2({
        dropdownParent: $('#select2parent'),
        placeholder: "Select a role"
    });
    modal.show();
}

let appeal_form = document.getElementById('appeal_Form');

function addServer(guild_id) {
    var notyf = new Notyf();

    let serverID = $('#server_id').val()
    if(!serverID) return notyf.error('Please provide server Id');

    $.ajax({
        url: '/addserver',
        method: 'POST',
        data: { guild_id, partner_server_id: serverID },
        success: function(data) {
            if(data.error) return notyf.error(data.error)
            else notyf.success('Added the server in heist partners list.')

            location.reload()
        }
    })
}

function submitAppeal(banned, reported, server, support) {
    var notyf = new Notyf();

    server = server.split(' ')
    let type = null;
    let banType = $('#banType').val()
    const banReason = $('#banReason').val()
    const appealText = $('#appealText').val()
    const futureActions = $('#futureActions').val()
    
    banType.includes('bot') ? type = 'bot' : banType.includes('support') ? type = 'support' : banType.includes('global') ? type = 'global' : Number(banType) > 0 ? type = 'server' : type = 'invalid';

    if(type == 'bot') {
        if(banned != 'true') {
            return notyf.error('you are not banned');
        }
    }
    else if(type == 'global') {
        if(reported != 'true') {
        return notyf.error('you are not global banned')
        }
    }
    else if(type == 'server') {
        if(!server.includes(banType)) {
            return notyf.error('server is not bot banned')
        }
    }
    else if(type == 'support') {
        if(support != 'true') {
            return notyf.error('you are not banned from support server')
        }
    }
    else {
        return notyf.error(`${banType} is not a valid option`)
    }

    appeal_form.submit()

}