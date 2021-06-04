<?php
include_once './protected.php';
include_once './database.php';

class api
{
    private $state = false;
    private $id = "";
    private $conn;
    private $data;

    function __construct()
    {
        header("Content-Type: application/json; charset=UTF-8");
        /*
              header("Access-Control-Allow-Origin: *");
              header("Content-Type: application/json; charset=UTF-8");

              header("Access-Control-Allow-Methods: POST");
              header("Access-Control-Max-Age: 3600");
              header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
      */
        $this->verify();
        $this->getId();

        $databaseService = new DatabaseService();
        $this->conn = $databaseService->getConnection();
        $this->data = json_decode(file_get_contents("php://input"));
        if (!$this->data->id) {
            $this->state = "missing_id";
        }
    }

    public function verify()
    {
        $protector = new jwtVerify();
        $this->state = $protector->verify();
    }

    public function getId()
    {
        $this->id = $this->data->id;
    }

    public function addBugReport()
    {
        if ($this->state !== true) {
            return $this->state;
        } else {
            $table_name = 'Bugs_report';
            $query = "INSERT INTO " . $table_name . " (Id_user, Message ) VALUES (:id, :report) ";

            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':id', $this->data->id);
            $stmt->bindParam(':report', $this->data->report);
            $stmt->execute();
            return "done";
        }
    }

    public function addFriend($hidden = 0)
    {
        if ($this->state !== true) {
            return $this->state;
        } else {
            $table_name = 'Friends';
            $query = "INSERT INTO " . $table_name . " (Id_user, Name, Hidden ) VALUES (:id, :name, :hidden) ";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':id', $this->data->id);
            $stmt->bindParam(':hidden', $hidden);
            $stmt->bindParam(':name', $this->data->name);
            $stmt->execute();
            return $this->conn->lastInsertId();
        }
    }

    public function addFriendsGroup()
    {
        if ($this->state !== true) {
            return $this->state;
        } else {
            $table_name = 'Group_friends';
            $query = "INSERT INTO " . $table_name . " (Id_user, Name ) VALUES (:id, :name) ";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':id', $this->data->id);
            $stmt->bindParam(':name', $this->data->name);
            $stmt->execute();
            return "done";
        }
    }

    public function addGame()
    {
        if ($this->state !== true) {
            return $this->state;
        } else {
            $table_name = 'Games';
            $query = "INSERT INTO " . $table_name . " ( Name ) VALUES (:name) ";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':name', $this->data->name);
            $stmt->execute();
            return "done";
        }
    }

    public function addResults()
    {
        if ($this->state !== true) {
            return $this->state;
        } else {
            $id = $this->addRound();
            $this->addResult($id);
            return "done";
        }
    }

    public function addRound()
    {

        $Date = DateTime::createFromFormat('Y-m-d', $this->data->date);
        $Date = $Date->format('Y-m-d');

        $table_name = 'Rounds';
        $query = "INSERT INTO " . $table_name . " ( Id_user, date, Id_game ) VALUES (:id , :date , :idGame) ";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $this->data->id);
        $stmt->bindParam(':date', $Date);
        $stmt->bindParam(':idGame', $this->data->gameid);
        $stmt->execute();
        return $this->conn->lastInsertId();
    }

    public function addResult($id)
    {
        $table_name = 'Results';
        foreach ($this->data->users as $user) {
            if (!$user->id) {

                $this->data->name = $user->name;
                $user->id = $this->addFriend(1);
            }
            $query = "INSERT INTO " . $table_name . " ( Id_round, Id_player , Result, Type) VALUES (:idGame , :id , :result, :type) ";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':idGame', $id);
            $stmt->bindParam(':id', $user->id);
            $stmt->bindParam(':result', $user->result);
            $stmt->bindParam(':type', $user->type);
            $stmt->execute();


        }
    }

    public function addFriendToGroup()
    {
        if ($this->state !== true) {
            return $this->state;
        } else {
            $table_name = 'Friends_groups_link';
            foreach ($this->data->friends as $friend) {
                $query = "INSERT INTO " . $table_name . " ( Id_group, Id_friend) VALUES (:group, :friend) ";
                $stmt = $this->conn->prepare($query);
                $stmt->bindParam(':group', $this->data->groupId);
                $stmt->bindParam(':friend', $friend);
                $stmt->execute();
            }
            return "done";
        }
    }

    public function addFavoriteGame()
    {
        if ($this->state !== true) {
            return $this->state;
        } else {
            $table_name = 'Favorite_game';
            $query = "INSERT INTO " . $table_name . " ( Id_user, Id_game ) VALUES (:user, :game) ";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':user', $this->data->id);
            $stmt->bindParam(':game', $this->data->gameid);
            $stmt->execute();
            return "done";
        }
    }

    public function getFriends()
    {
        if ($this->state !== true) {
            return $this->state;
        } else {

            $table_name = 'Friends';
            $limit = $this->data->limit ?: 12;

            $query = "SELECT Name, Id  FROM " . $table_name . "  WHERE Id_user = :id and Hidden = 0 LIMIT $limit";

            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':id', $this->data->id);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_CLASS);

        }
    }

    public function getGame()
    {
        if ($this->state !== true) {
            return $this->state;
        } else {

            $table_name = 'Games';
            $table_name2 = 'Favorite_game';

            $query = "SELECT t1.*, if(t2.id, 1, 0)  as IsFavorite FROM $table_name as t1  left join $table_name2 as t2 on t1.Id = t2.Id_game and t2.Id_user = :iduser  WHERE t1.Id = :id ";

            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':id', $this->data->gameid);
            $stmt->bindParam(':iduser', $this->data->id);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_CLASS);

        }
    }

    public function getGames()
    {

        if ($this->state !== true) {
            return $this->state;
        } else {

            $table_name = 'Games';
            $table_name2 = 'Favorite_game';
            $limit = $this->data->limit ?: 12;

            $query = "SELECT t1.Name, t1.Id, t1.Url, t1.Image, if(t2.id, 1, 0)  as IsFavorite  FROM $table_name as t1 left join $table_name2 as t2 on t1.Id = t2.Id_game  and t2.Id_user = :iduser  LIMIT $limit";

            $stmt = $this->conn->prepare($query);

            $stmt->bindParam(':iduser', $this->data->id);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_CLASS);

        }

    }

    public function getResults()
    {
        if ($this->state !== true) {
            return $this->state;
        } else {

            $table_name = 'Rounds';
            $table_name2 = 'Results';
            $table_name3 = 'Games';
            $table_name4 = 'Users';
            $table_name5 = 'Friends';

            $query = "select t1.date as date, t2.Result as result, t3.Name as game, t4.name as user_name, t5.Name as friend_name
from $table_name as t1
left join $table_name2 as t2 on t1.Id = t2.Id_round
left join $table_name3 as t3 on t1.Id_game = t3.Id
left join $table_name4 as t4 on t2.Id_player = t4.Id and t2.Type = 'user'
left join $table_name5 as t5 on t2.Id_player = t5.Id and t2.Type = 'friend'
where t1.Id_user = :id
  and t1.Id = :idround";

            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':id', $this->data->id);
            $stmt->bindParam(':idround', $this->data->idround);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_CLASS);

        }
    }

    public function getGroups()
    {
        if ($this->state !== true) {
            return $this->state;
        } else {

            $table_name = 'Group_friends';
            $limit = $this->data->limit ?: 12;

            $query = "SELECT Name, Id  FROM " . $table_name . "  WHERE Id_user = :id LIMIT $limit";

            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':id', $this->data->id);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_CLASS);

        }
    }

    public function getGroup()
    {
        if ($this->state !== true) {
            return $this->state;
        } else {

            $table_name = 'Group_friends';
            $table_name2 = 'Friends_groups_link';
            $table_name3 = 'Friends';

            $query = "SELECT  t3.Name as 'Name', t3.Id as 'Id' FROM " . $table_name . " as t1 LEFT JOIN $table_name2 as t2 on t1.Id = t2.Id_group LEFT JOIN $table_name3 as t3 on t3.Id = t2.Id_friend    WHERE t1.Id_user = :id and t1.Id = :groupid";

            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':id', $this->data->id);
            $stmt->bindParam(':groupid', $this->data->groupid);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_CLASS);

        }
    }

    public function getFriend()
    {
        if ($this->state !== true) {
            return $this->state;
        } else {

            $table_name = 'Friends';

            $query = "SELECT Name, Id  FROM " . $table_name . "  WHERE Id_user = :id and Id = :friendid";

            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':id', $this->data->id);
            $stmt->bindParam(':friendid', $this->data->friendid);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_CLASS);

        }
    }

    public function getFavoriteGames()
    {

        if ($this->state !== true) {
            return $this->state;
        } else {

            $table_name = 'Favorite_game';
            $table_name2 = 'Games';

            $query = "SELECT  t2.Name as 'Name', t2.Id as 'Id', t2.Url as Url FROM " . $table_name . " as t1 LEFT JOIN $table_name2 as t2 on t1.Id_game = t2.Id  WHERE t1.Id_user = :id ";

            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':id', $this->data->id);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_CLASS);

        }

    }

    public function getHomeData()
    {
        if ($this->state !== true) {
            return $this->state;
        } else {
            $arr = array();
            $arr['favorites'] = $this->getFavoriteGames();
            $arr['history'] = $this->getHistory();
            $arr['friends'] = $this->getFriends();
            /*return [
                "favorites" => [
                    "infiltré",
                    "loup"
                ],
                "history" => [
                    [
                        "date" => "2015.01.13",
                        "game" => "loup",
                        "player_count" => "13"
                    ],
                    [
                        "date" => "2201.03.06",
                        "game" => "infiltré",
                        "player_count" => "1"
                    ]
                ],
                "friends" => [
                    "josé",
                    "pierre-adelin"
                ]
            ];*/
            return $arr;

        }
    }

    public function getHistory()
    {
        if ($this->state !== true) {
            return $this->state;
        } else {

            $table_name = 'Rounds';
            $table_name2 = 'Games';
            $limit = $this->data->limit ?: 12;

            $query = "SELECT t2.Name as game, t1.Id as roundId, t1.date as date, t3.count as count, F.Name FROM  $table_name as t1 LEFT JOIN $table_name2 as t2 on t1.Id_game = t2.Id left join (select count(Id) as count, Id_round , min(Id_player) as Id from Results group by Id_round)as t3 on t3.Id_round = t1.Id left join Friends F on t3.Id = F.Id_user  WHERE t1.Id_user = :id LIMIT $limit";

            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':id', $this->data->id);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_CLASS);

        }
    }

    public function getUser()
    {
        if ($this->state !== true) {
            return $this->state;
        } else {

            $table_name = 'Users';

            $query = "SELECT Name, Id, Lastname, Mail, Age  FROM " . $table_name . "  WHERE Id = :id ";

            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':id', $this->data->id);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_CLASS);

        }
    }

    public function setUser()
    {
        if ($this->state !== true) {
            return $this->state;
        } else {
            $table_name = 'Users';
            if ($this->data->newname) {
                $query = "UPDATE  $table_name  SET Name = :name where Id = :id ";
                $stmt = $this->conn->prepare($query);
                $stmt->bindParam(':name', $this->data->newname);
                $stmt->bindParam(':id', $this->data->id);
                $stmt->execute();
            }
            if ($this->data->newlastname) {
                $query = "UPDATE  $table_name  SET Lastname = :name where Id = :id ";
                $stmt = $this->conn->prepare($query);
                $stmt->bindParam(':name', $this->data->newlastname);
                $stmt->bindParam(':id', $this->data->id);
                $stmt->execute();
            }
            if ($this->data->newdate) {

                $Age = DateTime::createFromFormat('Y-m-d', $this->data->newage);
                $Age = $Age->format('Y-m-d');

                $query = "UPDATE  $table_name  SET Age = :date where Id = :id ";
                $stmt = $this->conn->prepare($query);
                $stmt->bindParam(':date', $Age);
                $stmt->bindParam(':id', $this->data->id);
                $stmt->execute();
            }
            if ($this->data->newmail) {
                $query = "UPDATE  $table_name  SET Mail = :mail where Id = :id ";
                $stmt = $this->conn->prepare($query);
                $stmt->bindParam(':mail', $this->data->newmail);
                $stmt->bindParam(':id', $this->data->id);
                $stmt->execute();
            }
            return "done";
        }
    }

    public function removeFavorite()
    {
        if ($this->state !== true) {
            return $this->state;
        } else {
            $table_name = 'Favorite_game';

            $query = "DELETE FROM $table_name where Id_user = :id and Id_game = :idgame ";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':id', $this->data->id);
            $stmt->bindParam(':idgame', $this->data->gameid);
            $stmt->execute();

            return "done";
        }
    }

    public function setFriend()
    {
        if ($this->state !== true) {
            return $this->state;
        } else {
            $table_name = 'Friends';

            $query = "UPDATE  $table_name  SET Name = :name where Id = :friendid and Id_user = :id ";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':name', $this->data->newname);
            $stmt->bindParam(':friendid', $this->data->friendid);
            $stmt->bindParam(':id', $this->data->id);
            $stmt->execute();

            return "done";
        }
    }

    public function removeFriend()
    {
        if ($this->state !== true) {
            return $this->state;
        } else {
            $table_name = 'Friends';

            $query = "DELETE FROM $table_name where Id_user = :id and Id = :friendid ";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':friendid', $this->data->friendid);
            $stmt->bindParam(':id', $this->data->id);
            $stmt->execute();

            return "done";
        }
    }

    public function removeGroup()
    {
        if ($this->state !== true) {
            return $this->state;
        } else {
            $table_name = 'Group_friends';

            $query = "DELETE FROM $table_name where Id_user = :id and Id = :idgroup ";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':idgroup', $this->data->idgroup);
            $stmt->bindParam(':id', $this->data->id);
            $stmt->execute();

            return "done";
        }
    }

    public function removeFriendFromGroup()
    {
        if ($this->state !== true) {
            return $this->state;
        } else {
            $table_name = 'Friends_group_link';

            $query = "DELETE FROM $table_name where Id_friend = :idfriend and Id_group = :idgroup ";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':idgroup', $this->data->idgroup);
            $stmt->bindParam(':idfriend', $this->data->idfriend);
            $stmt->execute();

            return "done";
        }
    }

    public function setGroup()
    {
        if ($this->state !== true) {
            return $this->state;
        } else {
            $table_name = 'Group_friends';

            $query = "UPDATE  $table_name  SET Name = :name where Id = :groupid and Id_user = :id ";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':name', $this->data->newname);
            $stmt->bindParam(':groupid', $this->data->groupid);
            $stmt->bindParam(':id', $this->data->id);
            $stmt->execute();

            return "done";
        }
    }
}


