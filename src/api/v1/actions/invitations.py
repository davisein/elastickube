"""
Copyright 2016 ElasticBox All rights reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
"""

import logging
import uuid

from tornado.gen import coroutine, Return

from api.v1.actions import emails
from data.query import Query


class InvitationsActions(object):

    def __init__(self, settings, user):
        logging.info("Initializing InviteActions")

        self.database = settings['database']
        self.user = user

    @coroutine
    def check_permissions(self, operation, _document):
        logging.debug("check_permissions for user %s and operation %s on invitations", self.user["username"], operation)
        raise Return(self.user['role'] == 'administrator')

    @coroutine
    def _invite_user(self, email_address, hostname):
        invite_user = {
            "email": email_address,
            "role": "user",
            "schema": "http://elasticbox.net/schemas/user",
            "username": email_address,
            "invite_token": str(uuid.uuid4()),
        }

        yield Query(self.database, "Users").insert(invite_user)
        invite_info = {
            "email": email_address,
            "confirm_url": "%s/invite/%s" % (hostname, invite_user["invite_token"])
        }

        raise Return(invite_info)

    @coroutine
    def create(self, document):
        addresses = document.get("emails", [])
        note = document.get("note", "")

        settings = yield Query(self.database, "Settings").find_one()
        hostname = settings.get("hostname", "")

        logging.info('Inviting users "%s" with note "%s" with hostname "%s"', addresses, note, hostname)

        invitations = []
        for address in addresses:
            invite_info = yield self._invite_user(address, hostname)
            invitations.append(invite_info)

        if "mail" in settings:
            mail_settings = settings["mail"]
            yield emails.send_invites(mail_settings, invitations, note)
        else:
            logging.warning("Mail settings not added")

        raise Return(None)
