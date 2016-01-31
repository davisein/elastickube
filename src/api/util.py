import json
import bson


def serialize_datetime(datetime):
    return json.dumps(datetime, default=bson.json_util.default)