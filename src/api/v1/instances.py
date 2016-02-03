from v1.secure import SecureHandler


class InstancesHandler(SecureHandler):

    def get(self):
        response = dict(
            instances=[]
        )

        self.write(response)