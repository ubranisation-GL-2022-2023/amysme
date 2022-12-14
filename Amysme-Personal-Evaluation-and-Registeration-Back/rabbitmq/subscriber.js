const CLOUDAMQP_URL =
  "amqps://ssloczgx:Ga1orj494MmGG5R5FYTr5orsvVQY6rh5@stingray.rmq.cloudamqp.com/ssloczgx";

const amqp = require("amqplib");
const _ = require("lodash");
const util = require("util");

let log;

class Subscriber {
  constructor(options = {}, logOptions) {
    log = require("logfilename")(__filename, logOptions);
    if (!options.exchange) {
      throw new Error("exchange parameter missing in options");
    }
    if (!options.queueName) {
      throw new Error("queueName parameter missing in options");
    }
    this._queue;
    this._channel;
    this._options = _.defaults(options, {
      type: "topic",
      url: CLOUDAMQP_URL,
    });
    log.info("Subscriber options:", util.inspect(this._options));
  }

  async start(onIncomingMessage) {
    log.info("start");

    let options = this._options;
    let connection = await amqp.connect(options.url);
    log.info("createChannel");
    this._channel = await connection.createChannel();
    log.info("assertExchange ", options.exchange);
    await this._channel.assertExchange(options.exchange, options.type, {
      durable: true,
    });
    log.info("assertQueue name: ", options.queueName);
    let result = await this._channel.assertQueue(options.queueName, {
      exclusive: false,
    });

    this._queue = result.queue;
    let routingKeys = options.routingKeys || [options.queueName];
    log.info("assertQueue keys ", routingKeys);
    for (let routingKey of routingKeys) {
      log.info("bindQueue routingKey ", routingKey);
      await this._channel.bindQueue(this._queue, options.exchange, routingKey);
    }

    log.info("prefetch and consume");
    this._channel.prefetch(1);
    await this._channel.consume(this._queue, onIncomingMessage.bind(this));
    log.info("started");
  }
  async stop() {
    log.info("stop");
    if (this._channel) {
      return await this._channel.close();
    } else {
      log.warn("stopping but channel was not opened");
    }
  }
  ack(message) {
    log.debug("ack");
    this._channel.ack(message);
  }
  nack(message) {
    log.debug("nack");
    this._channel.nack(message);
  }
  async purgeQueue() {
    log.info("purgeQueue ", this._queue);
    if (this._channel) {
      return await this._channel.purgeQueue(this._queue);
    } else {
      log.warn("purgeQueue: channel not opened");
    }
  }
}

module.exports = {
  Subscriber,
};