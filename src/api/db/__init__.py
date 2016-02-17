import logging
from datetime import datetime

from pymongo import MongoClient


def initialize(mongo_url):
    logging.debug("Initialize DB")

    database = MongoClient(mongo_url).elastickube
    current_settings = database.Settings.find_one({"deleted": None})
    if current_settings:
        logging.debug("Found existing Settings document: %s", current_settings)
    else:
        current_date = datetime.utcnow().isoformat()
        result = database.Settings.insert({
            "created": current_date,
            "deleted": None,
            "schema": "http://elasticbox.net/schemas/settings",
            "updated": current_date,
            "authentication": {
                "password": {
                    "enabled": True
                },
                "google_oauth": {
                    "enabled": False
                }
            }
        })

        logging.debug("Did not find existing Settings, created it: %s", result)

    logging.debug("DB Initialized")
