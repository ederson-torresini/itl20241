import Phaser from 'phaser'

export default class parque extends Phaser.Scene {
  constructor () {
    super('parque')
  }

  preload () { }

  create () {
    this.botoes = [
      {
        numero: 0,
        topic: globalThis.game.mqttTopic + '/estado/0',
        x: 100,
        y: 100,
        valor: 0
      }
    ]
    this.botoes.forEach(botao => {
      this.add.text(botao.x, botao.y, botao.numero)
        .setInteractive()
        .on('pointerdown', () => {
          globalThis.game.clienteMQTT.publish(botao.topic, String(botao.valor), { qos: 1 })
          botao.valor = 1 - botao.valor
        })
    })
  }

  update () { }
}
