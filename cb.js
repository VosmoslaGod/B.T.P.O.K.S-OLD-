
const Vec3 = require("vec3");

function inject(bot) {
    
    bot.run = function(command) {
        let pos = new Vec3(Math.floor(bot.entity.position.x), 1, Math.floor(bot.entity.position.z));
        let block = bot.blockAt(pos);

        if (block.name != "repeating_command_block")
            bot.chat(`/setblock ${pos.x} ${pos.y} ${pos.z} repeating_command_block`);

        bot._client.write('update_command_block', {
        location: {
          x: pos.x,
          y: pos.y,
          z: pos.z
        }, 
        command: command, 
        mode: 1, 
        flags: 0b100
      });

    };

}

module.exports = inject;