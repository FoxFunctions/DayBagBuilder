using DayBagBuilder.Models;
using Microsoft.AspNetCore.Mvc;

namespace DayBagBuilder.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController
    {
        HikingBagContext hb = new HikingBagContext();
        [HttpGet("ShowAllUsers")]
        public List<User> ShowAllUser()
        {
            return hb.Users.ToList();
        }
        [HttpGet("GetUserById/{id}")]
        public User GetUserById(int id)
        {
            return hb.Users.Where(x => x.Id == id).First();
        }
        [HttpPut("CreateNewUser")]
        public string CreateNewUser(User u)
        {
            hb.Users.Add(u);
            hb.SaveChanges();
            return $"{u.UserId} was successfully added to the database";
        }
        [HttpDelete("DeleteUser/{id}")]
        public string DeleteUser(int id)
        {
            User u = hb.Users.Find(id);
            hb.Users.Remove(u);
            hb.SaveChanges();
            return $"{u.UserId} was successfully removed from the database";
        }
    }
}
