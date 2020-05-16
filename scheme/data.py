from faker import Faker
from decimal import Decimal
import random as r
import json
import csv

f = Faker()
Faker.seed(0)  # we are using the same data all the time here
r.seed(0)

global example_locs

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
    "foodbox",
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


def timeWindow():
    return dict(
        timeWindowType=r.choice(TimeWindowType),
        # eh, this is gonna be a problem, datetime my gosh
        startTime=f.future_datetime(
            end_date='+30d').strftime("%m/%d/%Y, %H:%M:%S"),

    )


def volunteer(organizationUid):
    return dict(
        uid=genId(),
        phoneNumber=f.phone_number(),
        photoURL='https://via.placeholder.com/150.png?text=User%20Image',
        displayName=f.name(),
        location=location(),
        organizationUid=organizationUid,
        isVolunteer=True,
        isOrganizer=f.boolean(chance_of_getting_true=25),
        voluteerDetails=dict(
            hasTransportation=f.boolean(chance_of_getting_true=75),
            status=r.choice(VolunteerPendingStatus),
            privateNotes=""),
        organizerDetails={},

    )


def location():
    row = r.choice(example_locs)
    return dict(
        address=row['address'],
        lat=float(row['lat']),
        lng=float(row['lng']),
        label=''
    )

def deliveryNotes():
    row = r.choice(example_locs)
    return row['notes']

def organization():
    return dict(
        uid=genId(),
        name="Feed Folks",
        chapterName="Feed Folks - Studio City",
        tagline="Neighbors Helping Neighbors",
        quickInfo="We're a grassroots team in Studio City, CA getting fresh farm produce to our neighbors in need.",
        logoURL='https://firebasestorage.googleapis.com/v0/b/mutualaid-757f6.appspot.com/o/images%2Ffeedfolks__logo.png?alt=media&token=6b1e803d-9b19-4847-a849-4b4dbdde2395',
        contactPhoneNumber="",
        location= {
            "address": "Studio City, CA",
            "label": "",
            "lat": 34.1483989,
            "lng": -118.3961877
        },      
        EINNumber='12-3456789',
        localTimeZone='',
        missions={},
        users={}
    )


def addGroup(shouldAdd):
    groupUid = ""
    groupDisplayName = ""
    if shouldAdd:
        groupDisplayName = r.choice(["Union Square 2020/05/04",
                                     "Daly City 2020/05/05", "San Mateo 2020/05/29"])
        groupUid = groupDisplayName
    return groupUid, groupDisplayName


def mission(orgId, volunteer, foodboxName):
    status = r.choice(MissionStatus)

    pickUpWindow = ""
    pickUpLocation = ""
    deliveryWindow = ""
    readyToStart = False
    fundedStatus = r.choice(AnyIsFundedStatus)

    volunteerUid = ""
    volunteerDisplayName = ""
    volunteerPhoneNumber = ""

    tentativeVolunteerUid = ""
    tentativeVolunteerDisplayName = ""
    tentativeVolunteerPhoneNumber = ""

    recipientUid = ""
    recipientDisplayName = f.name()
    recipientPhoneNumber = f.phone_number()

    groupUid = ""
    groupDisplayName = ""

    if status == "unassigned":
        fundedStatus = "notfunded"
    elif status == "tentative":
        readyToStart = r.choice([True, False])
        if r.choice([True, False]):
            tentativeVolunteerUid = volunteer["uid"]
            tentativeVolunteerDisplayName = volunteer["displayName"]
            tentativeVolunteerPhoneNumber = volunteer["phoneNumber"]
        groupUid, groupDisplayName = addGroup(r.choice([True, False]))

    elif status in ["assigned"]:
        volunteerUid = volunteer["uid"]
        volunteerDisplayName = volunteer["displayName"]
        volunteerPhoneNumber = volunteer["phoneNumber"]
        readyToStart = r.choice([True, False])
        groupUid, groupDisplayName = addGroup(r.choice([True, False]))

    else:
        readyToStart = True
        volunteerUid = volunteer["uid"]
        volunteerDisplayName = volunteer["displayName"]
        volunteerPhoneNumber = volunteer["phoneNumber"]
        groupUid, groupDisplayName = addGroup(r.choice([True, False]))

    mission_type = r.choice(MissionType)

    if mission_type == "foodbox":
        mission_details = {
            "needs": [
                {
                    "name": foodboxName,
                    "quantity": r.randint(1, 5),
                }
            ],
            "dummy": "This is only here because upload modules did not understand that we want this to be a field"
        }
    else:
        mission_details = ""
    return dict(
        uid=genId(),
        organizationUid=orgId,
        status=status,

        type=mission_type,
        fundedStatus=fundedStatus,
        readyToStart=readyToStart,

        missionDetails=mission_details,

        groupUid=groupUid,
        groupDisplayName=groupDisplayName,

        volunteerUid=volunteerUid,
        volunteerDisplayName=volunteerDisplayName,
        volunterPhoneNumber=volunteerPhoneNumber,

        tentativeVolunteerUid=tentativeVolunteerUid,
        tentativeVolunteerDisplayName=tentativeVolunteerDisplayName,
        tentativeVolunterPhoneNumber=tentativeVolunteerPhoneNumber,

        recipientDisplayName=recipientDisplayName,
        recipientPhoneNumber=recipientPhoneNumber,
        recipientUid='',

        pickUpWindow=timeWindow(),
        pickUpLocation=location(),
        pickUpNotes="",

        deliveryWindow=timeWindow(),
        deliveryLocation=location(),
        deliveryConfirmationImage='',
        deliveryNotes=deliveryNotes(),

        feedbackNotes=f.text(),

        createdDate='2020/05/02',
        fundedDate='2020/05/02'
    )


def add_volunteer(orgId, data):
    return data


if __name__ == "__main__":

    global example_locs
    with open('scheme/example_locations.csv', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile, delimiter=',', quotechar='"')
        example_locs = [row for row in reader]

    org = organization()
    orgId = "1"

    foodboxName = "Fruits & Veggies Medley"
    org["resources"] = {
        genId(): {
            "name": "Fruits & Veggies Medley",
            "cost": 30,
            "provider": 'Happy Farms',
            "fundedByRecipient": 8,
            "fundedByDonation": 2,
            "notFunded": 3,
            "maxNumberRequestable": 50,
            "acceptOrder": True
        }
    }

    org['paymentSettings'] = {
        'paypal': {
            'clientId': 'sb',
            'email': 'testpaypalemail@testpaypalemail.com'
        }
    }

    data = {
        "organizations": {
            orgId: org
        },
        "users": {}
    }

    for i in range(10):
        vol = volunteer(orgId)
        data["users"][vol["uid"]] = vol

    for i in range(60):
        userUid, user = r.choice(
            list(data["users"].items()))
        mis = mission(orgId, user, foodboxName)
        data["organizations"][orgId]['missions'][mis['uid']] = mis

    data['organizations'] = {
        orgId: org
    }

    json_data = json.dumps(data, indent=2)
    with open("scheme/data.json", "w") as outfile:
        outfile.write(json_data)
