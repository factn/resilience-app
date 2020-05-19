from faker import Faker
from decimal import Decimal
import random as r
import json
import csv
import time
from datetime import datetime

f = Faker()
Faker.seed(0)  # we are using the same data all the time here
r.seed(0)


def genId():
    return f.md5()


VolunteerPendingStatus = [
    "created",
    "pending",
    "approved",
    "declined",
]

MissionStatus = [
    "unassigned",
    "tentative",
    "assigned",
    "started",
    "delivered",
    "succeeded",
    "failed"
]

MissionFundedStatus = [
    "notfunded",
    "fundedbyrecipient",
    "fundingnotneeded",
    "fundedbydonation",
]
AnyIsFundedStatus = [
    "fundedbyrecipient",
    "fundingnotneeded",
    "fundedbydonation",
]

MissionType = [
    "resource",
    # "pharmacy", # to be added
    # "errand", # to be added
]

TimeWindowType = [
    "exact",
    "morning",
    "afternoon",
    "wholeday",
    "as soon as possible",
    "whenever possible"
]


def any_time():
    return datetime.now().isoformat()


def timeWindow():
    return dict(
        timeWindowType=r.choice(TimeWindowType),
        # eh, this is gonna be a problem, datetime my gosh
        startTime=any_time()
    )


def any_location():
    global locations
    row = r.choice(locations)
    return dict(
        address=row['address'],
        lat=float(row['lat']),
        lng=float(row['lng']),
        label=''
    )


def any_delivery_notes():
    global locations
    row = r.choice(locations)
    return row['notes']


def any_resource_details():
    global resources
    row = r.choice(resources)
    return dict(
        resourceUid=row['uid'],
        displayName=row['displayName'],
        quantity=r.choice([1, 2, 3]),
        type=row['type'],
        cost=row['cost'],
        description=row['description']
    )


class Group:
    def __init__(self, displayName):
        self.displayName = displayName
        self.uid = displayName

    @staticmethod
    def any_group():
        return Group(
            r.choice(["Union Square 2020/05/04",
                      "Daly City 2020/05/05",
                      "San Mateo 2020/05/29"])
        )


class Database:
    def __init__(self, resources):
        self.ordered_organizations = []
        self.ordered_users = []

    def create_organization(self, resources):
        org = Organization(resources)
        for i in range(10):
            vol = Volunteer(org.uid)
            self.ordered_users.append(vol)
            org.add_volunteers(vol)
        self.ordered_organizations.append(org)
        return org

    def any_user(self):
        return r.choice(self.ordered_users)

    def to_dict(self):
        return {
            "organizations": {org.uid: org.to_dict() for org in self.ordered_organizations},
            "users": {user.uid: user.to_dict() for user in self.ordered_users}
        }


class Organization:
    def __init__(self, resources):
        self.uid = "1"
        self.displayName = "Feed Folks"
        self.chapterName = "Feed Folks - Studio City"
        self.tagline = "Neighbors Helping Neighbors"
        self.quickInfo = "We're a grassroots team in Studio City, CA getting fresh farm produce to our neighbors in need."
        self.logoURL = 'https://firebasestorage.googleapis.com/v0/b/mutualaid-757f6.appspot.com/o/images%2Ffeedfolks__logo.png?alt=media&token=6b1e803d-9b19-4847-a849-4b4dbdde2395'
        self.contactEmail = "help@studiocitync.org"
        self.contactPhoneNumber = ""
        self.location = {
            "address": "Studio City, CA",
            "label": "",
            "lat": 34.1483989,
            "lng": -118.3961877
        }
        self.localTimeZone = ''
        self.EINNumber = ''
        self.ordered_missions = []
        self.ordered_resources = []
        self._init_resources(resources)
        self.paymentSettings = {
            'paypal': {
                'clientId': 'sb',
                'email': 'testpaypalemail@testpaypalemail.com'
            }
        }
        # inner attributes for easy access
        self.ordered_volunteers = []

    def add_volunteers(self, vol):
        self.ordered_volunteers.append(vol)

    def _init_resources(self, resources):
        for row in resources:
            self.ordered_resources.append({
                "uid": row["uid"],
                "displayName": row["displayName"],
                "cost": row["cost"],
                "availableToOrder": True,
                "type": row["type"],
                "description": row["description"]
            })

    def create_random_mission(self, recipient):
        mission = Mission(recipient)
        phase = r.choice(["proposed", "planning", "progress", "done"])
        volunteer = r.choice(self.ordered_volunteers)
        if phase == "proposed":
            pass
        elif phase == "planning":
            group = Group.any_group()
            mission.is_in_planning(volunteer, group)
        elif phase == "progress":
            mission.is_in_progress(volunteer)
        elif phase == "progress":
            mission.is_in_done(volunteer)
        self.ordered_missions.append(mission)

    def to_dict(self):
        dct = vars(self)
        dct["missions"] = {
            mission.uid: mission.to_dict() for mission in self.ordered_missions}
        dct["resources"] = {
            resources["uid"]: resources for resources in self.ordered_resources}
        # clean up
        dct.pop("ordered_missions", None)
        dct.pop("ordered_resources", None)
        dct.pop("ordered_volunteers", None)
        return dct


class Volunteer:
    def __init__(self, orgUid):
        self.uid = genId()
        self.phoneNumber = f.phone_number()
        self.photoURL = 'https://via.placeholder.com/150.png?text=User%20Image'
        self.displayName = f.name()
        self.location = any_location()
        self.organizationUid = orgUid
        self.isVolunteer = True
        self.isOrganizer = f.boolean(chance_of_getting_true=25)
        self.voluteerDetails = dict(
            hasTransportation=f.boolean(chance_of_getting_true=75),
            status=r.choice(VolunteerPendingStatus),
            privateNotes=""
        )

    def to_dict(self):
        return vars(self)


class Mission:
    def __init__(self, creator):
        self.uid = genId()
        self.organizationUid = creator.organizationUid
        self.status = "unassigned"

        self.type = r.choice(MissionType)
        self.details = None
        if self.type == "resource":
            self.details = [any_resource_details()
                            for i in range(r.choice([1, 2, 3]))]

        self.createdDate = any_time()

        self.fundedStatus = "notfunded"
        self.fundedDate = ""
        self.readyToStart = False

        self.groupUid = None
        self.groupDisplayName = None

        self.tentativeVolunteerUid = ""
        self.tentativeVolunteerDisplayName = ""
        self.tentativeVolunteerPhoneNumber = ""

        self.volunteerUid = ""
        self.volunteerDisplayName = ""
        self.volunteerPhoneNumber = ""

        self.recipientUid = creator.uid
        self.recipientDisplayName = creator.displayName
        self.recipientPhoneNumber = creator.phoneNumber

        self.pickUpWindow = timeWindow()
        self.pickUpLocation = any_location()
        self.pickUpNotes = ""

        self.deliveryWindow = timeWindow()
        self.deliveryLocation = any_location()
        self.deliveryConfirmationImage = None
        self.deliveryType = 'delivery'
        self.deliveryNotes = any_delivery_notes()
        self.feedbackNotes = 2

    # in propose to in planning view progression

    def is_in_planning(self, volunteer, group):
        self.status = "tentative"
        self.fundedStatus = "fundedbyrecipient"
        self.fundedDate = any_time()
        self.readyToStart = f.boolean(chance_of_getting_true=25)

        if f.boolean(chance_of_getting_true=50):
            self.tentativeVolunteerUid = volunteer.uid
            self.tentativeVolunteerDisplayName = volunteer.displayName
            self.tentativeVolunteerPhoneNumber = volunteer.phoneNumber
        if f.boolean(chance_of_getting_true=50):
            self.groupUid = group.uid
            self.groupDisplayName = group.displayName

    # misison is in progress view to in progress view
    def is_in_progress(self, volunteer):
        self.status = r.choice(["assigned", "started", "delivered"])
        self.fundedStatus = "fundedbyrecipient"
        self.readyToStart = True
        self.tentativeVolunteerUid = ""
        self.tentativeVolunteerDisplayName = ""
        self.tentativeVolunteerPhoneNumber = ""
        self.volunteerUid = volunteer.uid
        self.volunteerDisplayName = volunteer.displayName
        self.volunteerPhoneNumber = volunteer.phoneNumber

    def is_done(self, volunteer):
        self.status = r.chouce(["succeeded", "failed"])
        self.readyToStart = True
        self.fundedStatus = "fundedbyrecipient"
        volunteerUid = volunteer.uid
        volunteerDisplayName = volunteer.displayName
        volunteerPhoneNumber = volunteer.phoneNumber

    def to_dict(self):
        return vars(self)


def read_csv(path):
    obj = []
    with open(path, encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile, delimiter=',', quotechar='"')
        obj = [row for row in reader]
    return obj


if __name__ == "__main__":
    locations = read_csv("scheme/example_locations.csv")
    resources = read_csv("scheme/resources.csv")

    db = Database(resources)
    organization = db.create_organization(resources)
    
    for i in range(40):
        organization.create_random_mission(db.any_user())

    json_data = json.dumps(db.to_dict(), indent=2)
    with open("scheme/data.json", "w") as outfile:
        outfile.write(json_data)
