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
    )


VolunteerPendingStatus = [
    "created",
    "pending",
    "approved",
    "declined",
]


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


def add_volunteer(orgId, data):
    vol = volunteer(orgId)
    data['users'][vol['id']] = vol
    return data


MissionStatus = [
    "unassigned",
    "tentative",
    "assigned",
    "started",
    "delivered",
    "done",
]

MissionFundedStatus = [
    "fundingnotneeded",
    "fundedbyrecipient",
    "fundedinkind",
    "fundingnotneeded",
    "fundedbydonation",
]

MissionPayableStatus = [
    "notacquired",
    "readyforpickup",
]

MissionType = [
    "foodbox",
    "pharmacy",
    "errand",
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
        endTime="",  # skip this
    )


def mission(orgId):
    return dict(
        id=genId(),
        type=r.choice(MissionType),
        status=r.choice(MissionStatus),
        fundedStatus=r.choice(MissionFundedStatus),
        paybleStatus=r.choice(MissionPayableStatus),
        organizationId=orgId,
        tentativeVolnteerId='',
        volunteerId='',
        title=f.sentence(),
        description=f.text(),
        image='',
        notes='',
        privateNotes='',
        cost='',
        pickUpWindow=timeWindow(),
        pickUpLocation=location(),
        deliveryWindow=timeWindow(),
        deliveryLocation=location(),
        deliveryConfirmationImage='',
        deliveryNotes='',
        missionAccepted=False,
        feedbackNotes='',
        recipientName='',
        recipientPhoneNumber='',
        recipientId='',
        created='',
        lastUpdated=''
    )


def add_mission(orgId, data):
    mis = mission(orgId)
    data['missions'][mis['id']] = mis
    return data


if __name__ == "__main__":
    org = organization()
    data = {'missions': {}, "users": {}}

    [add_mission(org['id'], data) for i in range(100)]
    [add_volunteer(org['id'], data) for i in range(20)]

    json_data = json.dumps(data, indent=2)
    with open("data.json", "w") as outfile:
        outfile.write(json_data)
