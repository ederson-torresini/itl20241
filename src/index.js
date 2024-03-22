import Phaser from 'phaser'
import mqtt from 'mqtt'
import config from './config.js'
import parque from './parque.js'

class Game extends Phaser.Game {
  constructor () {
    super(config)

    this.mqttURL = 'wss://itl20241:itl20241@feira-de-jogos.sj.ifsc.edu.br/mqtt/'
    this.mqttTopic = 'itl20241'

    this.clienteMQTT = mqtt.connect(this.mqttURL)
    this.clienteMQTT.on('connect', () => {
      this.clienteMQTT.subscribe(this.mqttTopic + '/estado/#', { qos: 1 })
      this.clienteMQTT.publish(this.mqttTopic + '/mensagem', 'enviar-dados-completos', { qos: 1 })
    })

    this.scene.add('parque', parque)
    this.scene.start('parque')
  }
}

window.onload = () => {
  window.game = new Game()
}
