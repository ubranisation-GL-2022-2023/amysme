const Promise = require("bluebird");
const amqp = require("amqplib");
const _ = require("lodash");
const util = require("util");

const CLOUDAMQP_URL =
  "amqps://ssloczgx:Ga1orj494MmGG5R5FYTr5orsvVQY6rh5@stingray.rmq.cloudamqp.com/ssloczgx";

let log;

class Publisher {
  constructor(options = {}, logOptions) {
    log = require("logfilename")(__filename, logOptions);
    if (!options.exchange) {
      throw new Error("exchange parameter missing in options");
    }
    this._options = _.defaults(options, {
      type: "topic",
      url: CLOUDAMQP_URL,
    });
    log.info("Publisher options:", util.inspect(this._options));
  }
  async start() {
    let options = this._options;
    log.info("start ", util.inspect(options));
    let connection = await amqp.connect(options.url);
    log.info("connected to mq");
    this._channel = await connection.createChannel();
    log.info("connected to channel");
    let res = await this._channel.assertExchange(
      options.exchange,
      options.type,
      { durable: true }
    );
    log.info("connected ", res);
  }

  async stop() {
    log.info("stop");
    if (this._channel) {
      return await this._channel.close();
    } else {
      return Promise.resolve();
    }
  }
  async publish(key, message) {
    log.info(
      "publish exchange:%s, key:%s, message ",
      this._options.exchange,
      key,
      message
    );
    if (this._channel) {
      return this._channel.publish(
        this._options.exchange,
        key,
        Buffer.from(message)
      );
    } else {
      throw {
        code: 503,
        name: "MessageQueueNotAvailable",
        message: "Message queue channel not available",
      };
    }
  }
}
module.exports = {
  Publisher,
};
