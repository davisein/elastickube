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

import httplib
import os
import re

import cairosvg
from bson.objectid import ObjectId
from tornado.gen import coroutine, Return
from tornado.web import RequestHandler

from api import resources
from api.v1 import get_icon_template, load_colors
from data.query import Query

CHART_ICON_TEMPLATE = get_icon_template(os.path.join(resources.ROOT_PATH, 'icon_template.svg'))
COLORS = load_colors(os.path.join(resources.ROOT_PATH, 'colors.json'))
ICON_ENTITIES = {'charts', 'instances'}


class IconGenerator(RequestHandler):

    @coroutine
    def get(self, entity_id, chart_id):
        if not ObjectId.is_valid(chart_id):
            self.set_status(httplib.BAD_REQUEST)
            raise Return()

        if entity_id not in ICON_ENTITIES:
            self.set_status(httplib.NOT_FOUND)
            raise Return()

        chart = yield Query(self.settings["database"], entity_id.capitalize()).find_one({"_id": ObjectId(chart_id)})
        if chart is None:
            self.set_status(httplib.NOT_FOUND)
            raise Return()

        icon_data, last_updated = self._get_chart_icon(chart)

        modified_since = self.request.headers.get(resources.IF_MODIFIED_HEADER)
        if modified_since is not None and last_updated == modified_since:
            self.set_status(httplib.NOT_MODIFIED)

        accept = self.request.headers.get(resources.ACCEPT_HEADER)
        if accept is not None and accept.lower() == resources.SVG_CONTENT_TYPE:
            icon = icon_data
            content_type = resources.SVG_CONTENT_TYPE
        else:
            icon = cairosvg.svg2png(icon_data)
            content_type = resources.PNG_CONTENT_TYPE

        self.add_header(resources.CONTENT_TYPE_HEADER, content_type)
        self.add_header(resources.CACHE_CONTROL, resources.CACHE_CONTROL_NO_CACHE)

        self.write(icon)

    def _get_chart_icon(self, chart):
        letters = self._get_icon_letters(chart['name'])
        first_letter = letters[:1]
        color = COLORS[first_letter] if first_letter in COLORS else COLORS["BORDER_DEFAULT"]

        return CHART_ICON_TEMPLATE["template"].format(color, letters), CHART_ICON_TEMPLATE["last_modified"]

    @staticmethod
    def _get_icon_letters(name):
        words = re.findall(r"[\w']+", name.upper())[:2]
        letters = ""
        for word in words:
            letters += word[:1]

        return letters
