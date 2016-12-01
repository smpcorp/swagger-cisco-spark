# Cisco Spark Swagger Definition

Swagger Definition for the Cisco Spark API version 1

*Note: This is a generated README file. For details on the data types in the examples, reference [developer.ciscospark.com](https://developer.ciscospark.com).*

### People

Query, Create, Update, and Delete Spark Users.

#### people.getPeople(queryObject)

[get] https://api.ciscospark.com/v1/people/

Search people by email address or dispaly name.

**Example queryObject:**

```json
{
  "email": "email string",
  "displayName": "displayName string"
}
```

#### people.addPerson(queryObject)

[post] https://api.ciscospark.com/v1/people/

Create a new user account for a given organization. Only an admin can create a new user account.

**Example queryObject:**

```json
{
  "body": {
    "emails": ["emails string", "emails string"],
    "displayName": "displayName string",
    "firstName": "firstName string",
    "lastName": "lastName string",
    "avatar": "avatar string",
    "orgId": "orgId string",
    "roles": ["roles string", "roles string"],
    "licenses": ["licenses string", "licenses string"]
  }
}
```

#### people.getPerson(queryObject)

[get] https://api.ciscospark.com/v1/people/{personId}

Shows details for a person by ID. Specify the person ID in the personId parameter in the URI.

**Example queryObject:**

```json
{
  "personId": "personId string"
}
```

#### people.updatePerson(queryObject)

[put] https://api.ciscospark.com/v1/people/{personId}

Update details for a person, by ID. Specify the person ID in the personId parameter in the URI. Only an admin can update person details.

**Example queryObject:**

```json
{
  "body": {
    "emails": ["emails string", "emails string"],
    "displayName": "displayName string",
    "firstName": "firstName string",
    "lastName": "lastName string",
    "avatar": "avatar string",
    "orgId": "orgId string",
    "roles": ["roles string", "roles string"],
    "licenses": ["licenses string", "licenses string"]
  },
  "personId": "personId string"
}
```

#### people.deletePerson(queryObject)

[delete] https://api.ciscospark.com/v1/people/{personId}

Remove a person from the system. Only an admin can remove a person. Specify the person ID in the personId parameter in the URI.

**Example queryObject:**

```json
{
  "personId": "personId string"
}
```

#### people.getMe(queryObject)

[get] https://api.ciscospark.com/v1/people/me

Show the details of the Person Object of the authenticated user.

**Example queryObject:**

```json
{}
```

### Rooms

Query, Create, Update, and Delete Spark Rooms.

#### rooms.getRooms(queryObject)

[get] https://api.ciscospark.com/v1/rooms/

List rooms. By default, lists rooms to which the authenticated user belongs.

**Example queryObject:**

```json
{
  "teamId": "teamId string",
  "type": "type string"
}
```

#### rooms.createRoom(queryObject)

[post] https://api.ciscospark.com/v1/rooms/

Creates a room. The authenticated user is automatically added as a member of the room. See the Memberships API to learn how to add more people to the room.

**Example queryObject:**

```json
{
  "body": {
    "title": "title string",
    "teamId": "teamId string"
  }
}
```

#### rooms.getRoom(queryObject)

[get] https://api.ciscospark.com/v1/rooms/{roomId}

Shows details for a room, by ID. Specify the room ID in the roomId parameter in the URI.

**Example queryObject:**

```json
{
  "roomId": "roomId string"
}
```

#### rooms.updateRoom(queryObject)

[put] https://api.ciscospark.com/v1/rooms/{roomId}

Updates details for a room, by ID. Specify the room ID in the roomId parameter in the URI.

**Example queryObject:**

```json
{
  "body": {
    "title": "title string"
  },
  "roomId": "roomId string"
}
```

#### rooms.deleteRoom(queryObject)

[delete] https://api.ciscospark.com/v1/rooms/{roomId}

Deletes a room, by ID. Specify the room ID in the roomId parameter in the URI.

**Example queryObject:**

```json
{
  "roomId": "roomId string"
}
```

### Memberships

Query, Create, Update, and Delete Spark Room Memberships.

#### memberships.getMemberships(queryObject)

[get] https://api.ciscospark.com/v1/memberships/

Lists all room memberships. By default, lists memberships for rooms to which the authenticated user belongs. Use query parameters to filter the response. Use roomId to list memberships for a room, by ID. Use either personId or personEmail to filter the results.

**Example queryObject:**

```json
{
  "roomId": "roomId string",
  "personId": "personId string",
  "personEmail": "personEmail string"
}
```

#### memberships.createMembership(queryObject)

[post] https://api.ciscospark.com/v1/memberships/

Add someone to a room by Person ID or email address; optionally making them a moderator.

**Example queryObject:**

```json
{
  "body": {
    "roomId": "roomId string",
    "personId": "personId string",
    "personEmail": "personEmail string",
    "isModerator": "true"
  }
}
```

#### memberships.getMembership(queryObject)

[get] https://api.ciscospark.com/v1/memberships/{membershipId}

Get details for a membership by ID. Specify the membership ID in the membershipId URI parameter.

**Example queryObject:**

```json
{
  "membershipId": "membershipId string"
}
```

#### memberships.updateMembership(queryObject)

[put] https://api.ciscospark.com/v1/memberships/{membershipId}

Updates properties for a membership by ID. Specify the membership ID in the membershipId URI parameter.

**Example queryObject:**

```json
{
  "body": {
    "isModerator": "true"
  },
  "membershipId": "membershipId string"
}
```

#### memberships.deleteMembership(queryObject)

[delete] https://api.ciscospark.com/v1/memberships/{membershipId}

Deletes a membership by ID. Specify the membership ID in the membershipId URI parameter.

**Example queryObject:**

```json
{
  "membershipId": "membershipId string"
}
```

### Messages

Query, Create, and Delete Spark Messages.

#### messages.getMessages(queryObject)

[get] https://api.ciscospark.com/v1/messages/

Lists all messages in a room with roomType. If present, includes the associated media content attachment for each message. The roomType could be a group or direct (1:1). The list sorts the messages in descending order by creation date.

**Example queryObject:**

```json
{
  "roomId": "roomId string",
  "mentionedPeople": "mentionedPeople string",
  "before": "before string",
  "beforeMessage": "beforeMessage string"
}
```

#### messages.createMessage(queryObject)

[post] https://api.ciscospark.com/v1/messages/

Posts a plain text or markdown formatted message, and optionally, a media content attachment, to a room.

**Example queryObject:**

```json
{
  "body": {
    "roomId": "roomId string",
    "toPersonId": "toPersonId string",
    "toPersonEmail": "toPersonEmail string",
    "text": "text string",
    "markdown": "markdown string",
    "html": "html string",
    "files": "files string"
  }
}
```

#### messages.getMessage(queryObject)

[get] https://api.ciscospark.com/v1/messages/{messageId}

Shows details for a message, by message ID. Specify the message ID in the messageId parameter in the URI.

**Example queryObject:**

```json
{
  "messageId": "messageId string"
}
```

#### messages.deleteMessage(queryObject)

[delete] https://api.ciscospark.com/v1/messages/{messageId}

Deletes a message, by message ID. Specify the message ID in the messageId parameter in the URI.

**Example queryObject:**

```json
{
  "messageId": "messageId string"
}
```

### Teams

Query, Create, Update, and Delete Spark Teams.

#### teams.getTeams(queryObject)

[get] https://api.ciscospark.com/v1/teams/

Lists teams to which the authenticated user belongs.

**Example queryObject:**

```json
{}
```

#### teams.createTeam(queryObject)

[post] https://api.ciscospark.com/v1/teams/

Creates a team. The authenticated user is automatically added as a member of the team. See the Team Memberships API to learn how to add more people to the team.

**Example queryObject:**

```json
{
  "body": {
    "name": "name string"
  }
}
```

#### teams.getTeam(queryObject)

[get] https://api.ciscospark.com/v1/teams/{teamId}

Shows details for a team, by ID. Specify the room ID in the teamId parameter in the URI.

**Example queryObject:**

```json
{
  "teamId": "teamId string"
}
```

#### teams.updateTeam(queryObject)

[put] https://api.ciscospark.com/v1/teams/{teamId}

Updates details for a team, by ID. Specify the team ID in the teamId parameter in the URI.

**Example queryObject:**

```json
{
  "body": {
    "name": "name string"
  },
  "teamId": "teamId string"
}
```

#### teams.deleteTeam(queryObject)

[delete] https://api.ciscospark.com/v1/teams/{teamId}

Deletes a team, by ID. Specify the team ID in the teamId parameter in the URI.

**Example queryObject:**

```json
{
  "teamId": "teamId string"
}
```

### TeamMemberships

Query, Create, Update, and Delete Spark Team Memberships.

#### teamMemberships.getTeamMemberships(queryObject)

[get] https://api.ciscospark.com/v1/team/memberships/

Lists all team memberships. By default, lists memberships for teams to which the authenticated user belongs. Use query parameters to filter the response. Use teamId to list memberships for a team, by ID.

**Example queryObject:**

```json
{
  "teamId": "teamId string"
}
```

#### teamMemberships.createTeamMembership(queryObject)

[post] https://api.ciscospark.com/v1/team/memberships/

Add someone to a team by Person ID or email address; optionally making them a moderator.

**Example queryObject:**

```json
{
  "body": {
    "teamId": "teamId string",
    "personId": "personId string",
    "personEmail": "personEmail string",
    "isModerator": "true"
  }
}
```

#### teamMemberships.getTeamMembership(queryObject)

[get] https://api.ciscospark.com/v1/team/memberships/{membershipId}

Get details for a membership by ID. Specify the membership ID in the membershipId URI parameter.

**Example queryObject:**

```json
{
  "membershipId": "membershipId string"
}
```

#### teamMemberships.updateTeamMembership(queryObject)

[put] https://api.ciscospark.com/v1/team/memberships/{membershipId}

Updates properties for a membership by ID. Specify the membership ID in the membershipId URI parameter.

**Example queryObject:**

```json
{
  "body": {
    "isModerator": "true"
  },
  "membershipId": "membershipId string"
}
```

#### teamMemberships.deleteTeamMembership(queryObject)

[delete] https://api.ciscospark.com/v1/team/memberships/{membershipId}

Deletes a membership by ID. Specify the membership ID in the membershipId URI parameter.

**Example queryObject:**

```json
{
  "membershipId": "membershipId string"
}
```

### Webhooks

Query, Create, Update, and Delete Spark Webhooks.

#### webhooks.getWebhooks(queryObject)

[get] https://api.ciscospark.com/v1/webhooks/

Lists all of your webhooks.

**Example queryObject:**

```json
{}
```

#### webhooks.createWebhook(queryObject)

[post] https://api.ciscospark.com/v1/webhooks/

Creates a webhook.

**Example queryObject:**

```json
{
  "body": {
    "name": "name string",
    "targetUrl": "targetUrl string",
    "resource": "resource string",
    "event": "event string",
    "filter": "filter string",
    "secret": "secret string"
  }
}
```

#### webhooks.getWebhook(queryObject)

[get] https://api.ciscospark.com/v1/webhooks/{webhookId}

Shows details for a webhook, by ID. Specify the webhook ID in the webhookId parameter in the URI.

**Example queryObject:**

```json
{
  "webhookId": "webhookId string"
}
```

#### webhooks.updateWebhook(queryObject)

[put] https://api.ciscospark.com/v1/webhooks/{webhookId}

Updates a webhook, by ID. Specify the webhook ID in the webhookId parameter in the URI.

**Example queryObject:**

```json
{
  "body": {
    "name": "name string",
    "targetUrl": "targetUrl string"
  },
  "webhookId": "webhookId string"
}
```

#### webhooks.deleteWebhook(queryObject)

[delete] https://api.ciscospark.com/v1/webhooks/{webhookId}

Deletes a webhook, by ID. Specify the webhook ID in the webhookId parameter in the URI.

**Example queryObject:**

```json
{
  "webhookId": "webhookId string"
}
```

### Organizations

Query Organizations

#### organizations.getOrganizations(queryObject)

[get] https://api.ciscospark.com/v1/organizations/

Lists all of your visible Organizations.

**Example queryObject:**

```json
{}
```

#### organizations.getOrganization(queryObject)

[get] https://api.ciscospark.com/v1/organizations/{orgId}

Shows details for a organization, by ID. Specify the organization ID in the orgId parameter in the URI.

**Example queryObject:**

```json
{
  "orgId": "orgId string"
}
```

### Licenses

Query Licenses

#### licenses.getLicenses(queryObject)

[get] https://api.ciscospark.com/v1/licenses/

Lists all of your visible Licenses.

**Example queryObject:**

```json
{}
```

#### licenses.getLicense(queryObject)

[get] https://api.ciscospark.com/v1/licenses/{licenseId}

Shows details for a license, by ID. Specify the license ID in the licenseId parameter in the URI.

**Example queryObject:**

```json
{
  "licenseId": "licenseId string"
}
```

### Roles

Query Roles

#### roles.getRoles(queryObject)

[get] https://api.ciscospark.com/v1/roles/

Lists all of your visible Roles.

**Example queryObject:**

```json
{}
```

#### roles.getRole(queryObject)

[get] https://api.ciscospark.com/v1/roles/{roleId}

Shows details for a role, by ID. Specify the role ID in the roleId parameter in the URI.

**Example queryObject:**

```json
{
  "roleId": "roleId string"
}
```

### Contents

Retrieve Files

#### contents.getContent(queryObject)

[get] https://api.ciscospark.com/v1/contents/{contentId}

Retrieve the contents of a file by content ID.

**Example queryObject:**

```json
{
  "contentId": "contentId string"
}
```


