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


def pickOne(lst):
    return lst[r.randint(0, len(lst)-1)]


def location():
    return dict(
        address=f.address(),
        lat=lat + float(f.latitude())/1000,
        lng=lng + float(f.longitude())/1000,
        note=""
    )


def organization():
    return dict(
        id=genId(),
        name=f.name(),
        location=location()
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
        phone=f.phone_number(),
        profileName=f.name(),
        location=location(),
        organizationId=organizationId,
        isVolunteer=True,
        iSOrganizer=False,
        voluteerDetails=dict(
            hasTransportation=f.boolean(chance_of_getting_true=75),
            status=pickOne(VolunteerPendingStatus)
        )
    )


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
        timeWindowType=pickOne(TimeWindowType),
        # eh, this is gonna be a problem, datetime my gosh
        startTime=f.future_datetime(
            end_date='+30d').strftime("%m/%d/%Y, %H:%M:%S"),
        endTime="",  # skip this
    )


def addMission(orgId, missions):
    uid = genId()
    missions['missions'][uid] = dict(
        type=pickOne(MissionType),
        status=pickOne(MissionStatus),
        fundedStatus=pickOne(MissionFundedStatus),
        paybleStatus=pickOne(MissionPayableStatus),
        organizationId=orgId,
        tentativeVolnteerId='',
        volunteerId='',
        title=f.sentence(),
        description=f.text(),
        image='',
        notes='',
        privateNotes='',
        cost='',
        pickupWindow=timeWindow(),
        pickupLocation=location(),
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


if __name__ == "__main__":
    org = organization()
    #volunteers = [volunteer(org['id']) for i in range(1)]
    missions = {'missions': {}}
    [addMission(org['id'], missions) for i in range(100)]
    json_data = json.dumps(missions, indent=2)
    with open("data.json", "w") as outfile:
        outfile.write(json_data)
