from tornado.gen import coroutine, Return


class Query(object):

    def __init__(self, database, collection):
        self.database = database
        self.collection = collection

    @coroutine
    def find_one(self, criteria={}):
        document = yield self.database[self.collection].find_one(criteria)
        raise Return(document)

