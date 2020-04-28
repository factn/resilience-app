from faker import Faker
from decimal import Decimal
import random as r
import json


f = Faker()
Faker.seed(0)  # we are using the same data all the time here
r.seed(0)
lat = 37.773972
lng = -122.431297


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
    "accepted",
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


def volunteer(organizationId):
    return dict(
        id=genId(),
        phoneNumber=f.phone_number(),
        photoURL='https://via.placeholder.com/150.png?text=User%20Image',
        displayName=f.name(),
        location=location(),
        organizationId=organizationId,
        isVolunteer=True,
        isOrganizer=f.boolean(chance_of_getting_true=25),
        voluteerDetails=dict(
            hasTransportation=f.boolean(chance_of_getting_true=75),
            status=r.choice(VolunteerPendingStatus),
            privateNotes=""),
        organizerDetails={},

    )


def location():
    return dict(
        address=f.address(),
        lat=lat + float(f.latitude())/1000,
        lng=lng + float(f.longitude())/1000,
        label=""
    )


def organization():
    return dict(
        id=genId(),
        name=f.name(),
        location=location(),
        localTimeZone='',
        missions={},
        users={}
    )


def mission(orgId, volunteer, foodboxName):
    status = r.choice(MissionStatus)

    pickUpWindow = ""
    pickUpLocation = ""
    deliveryWindow = ""
    readyStatus = False
    fundedStatus = r.choice(AnyIsFundedStatus),

    volunteerId = ""
    volunteerDisplayName = ""
    volunteerPhoneNumber = ""

    tentativeVolunteerId = ""
    tentativeVolunteerDisplayName = ""
    tentativeVolunteerPhoneNumber = ""

    recipientId = ""
    recipientDisplayName = f.name()
    recipientPhoneNumber = f.phone_number()

    if status == "unassigned":
        fundedStatus = "notfunded"
    elif status == "tentative":
        readyStatus = r.choice([True, False]),
    elif status in ["assigned"]:
        tentativeVolunteerId = volunteer["id"]
        tentativeVolunteerDisplayName = volunteer["displayName"]
        tentativeVolunteerPhoneNumber = volunteer["phoneNumber"]
        readyStatus = r.choice([True, False]),
    else:
        readyStatus = True
        volunteerId = volunteer["id"]
        volunteerName = volunteer["displayName"]
        volunteerPhoneNumber = volunteer["phoneNumber"]

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
        id=genId(),
        organizationId=orgId,
        status=status,

        type=mission_type,
        fundedStatus=fundedStatus,
        readyStatus=readyStatus,

        missionDetails=mission_details,
        notes=f.text(),

        volunteerId=volunteerId,
        volunteerDisplayName=volunteerDisplayName,
        volunterPhoneNumber=volunteerPhoneNumber,

        tentativeVolunteerId=tentativeVolunteerId,
        tentativeVolunteerDisplayName=tentativeVolunteerDisplayName,
        tentativeVolunterPhoneNumber=tentativeVolunteerPhoneNumber,

        recipientDisplayName=recipientDisplayName,
        recipientPhoneNumber=recipientPhoneNumber,
        recipientId='',

        pickUpWindow=timeWindow(),
        pickUpLocation=location(),
        deliveryWindow=timeWindow(),
        deliveryLocation=location(),

        deliveryConfirmationImage='',
        deliveryNotes='',
        feedbackNotes='',
    )


def add_volunteer(orgId, data):
    return data


if __name__ == "__main__":
    org = organization()
    orgId = "1"

    foodboxName = "Fruits & Veggies Medley"
    org["resources"] = {
        genId(): {
            "name": "Fruits & Veggies Medley",
            "cost": 30,
            "fundedByRecipient": 8,
            "fundedByDonation": 2,
            "notFunded": 3,
            "maxNumberRequestable": 50,
            "acceptOrder": True
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
        data["users"][vol["id"]] = vol

    for i in range(60):
        userId, user = r.choice(
            list(data["users"].items()))
        mis = mission(orgId, user, foodboxName)
        data["organizations"][orgId]['missions'][mis['id']] = mis

    data['organizations'] = {
        orgId: org
    }

    json_data = json.dumps(data, indent=2)
    with open("data.json", "w") as outfile:
        outfile.write(json_data)
