import pika


class Publisher:
    def __init__(self, config):
        self.config = config

    def setup(self):
        connection = self.create_connection()
        # Create a new channel with the next available channel number
        # or pass in a channel number to use
        self.channel = connection.channel()
        # Creates an exchange if it does not already exist, and if
        # the exchange exists,
        # verifies that it is of the correct and expected class.
        self.channel.exchange_declare(
            exchange=self.config["exchange"], exchange_type="topic",durable=True)

    def publish_message(self, routing_key, message):
        # Publishes message to the exchange with the given routing key
        self.channel.basic_publish(exchange=self.config["exchange"],
                              routing_key=routing_key, body=message)
        print(" [x] Sent message % r for % r" % (message, routing_key))
   # Create new connection

    def create_connection(self):
        param = pika.URLParameters(url=self.config["url"])
        return pika.BlockingConnection(param)
