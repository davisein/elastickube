from v1.secure import SecureHandler


class NamespacesHandler(SecureHandler):

    def get(self):
        response = dict(
            namespaces=self.user.get("namespaces", [])
        )

        self.write(response)