from faker import Faker
from decimal import Decimal
import random as r


f = Faker()
Faker.seed(0)  # we are using the same data all the time here
random.seed(0)
lat = 37.773972
lng = -122.431297


def genId():
    return f.md5()


def pickOne(lst):
    return lst[r.randint(1, len(lst))]


def location():
    return dict(
        address=f.address(),
        lat=lat + float(f.latitude())/1000,
        lng=lng + float(f.longitude())/1000,
        note=""
    )


def organization():
    return dict(
        uid=f.getId(),
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
        uid=f.getId(),
        phone=f.phone_number(),
        profileName=f.name(),
        location=location(),
        organizationId=organizationId,
        isVolunteer=True,
        iSOrganizer=False,
        voluteerDetails=dict(
            hasTransportation=f.boolean(chance_of_getting_true=75),
            pendingStatus=VolunteerPendingStatus[r.randint(1, 4)]
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
    "morning",
    "afternoon",
    "wholeday",
    "asap",
]


def timeWindow():
    return dict(
        timeWindowType=pickOne(TimeWindowType),
        # eh, this is gonna be a problem, datetime my gosh
        startTime=f.future_datetime(end_date='+30d'),
        endTime="",  # skip this
    )


def mission():
    return dict(
        uid=genId(),
        type=pickOne(MissionType),
        status=pickOne(MissionStatus),
        fundedStatus=pickOne(MissionFundedStatus),
        paybleStatus=pickOne(MissionPayableStatus)
    )
