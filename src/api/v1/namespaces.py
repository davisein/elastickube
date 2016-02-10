from api.v1.secure import SecureRequestHandler


class NamespacesHandler(SecureRequestHandler):

    def get(self):
        response = dict(
            namespaces=self.user.get("namespaces", [])
        )

        self.write(response)
