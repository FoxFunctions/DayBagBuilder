using DayBagBuilder.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DayBagBuilder.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BagSaveController : ControllerBase
    {
        HikingBagContext hb = new HikingBagContext();

        [HttpGet("ShowAllBagSave")]
        public List<BagSave> ShowAllBagSave()
        {
            return hb.BagSaves.ToList();
        }

        [HttpPut("CreateBagSave")]
        public string CreateBagSave(BagSave b)
        {
            hb.BagSaves.Add(b);
            hb.SaveChanges();
            return $"{b.BagId} was successfully added to the database";
        }
        [HttpDelete("DeleteBagSave/{id}")]

        public string DeleteBagSave(int id)
        {
            BagSave b = hb.BagSaves.Find(id);
            hb.BagSaves.Remove(b);
            hb.SaveChanges();
            return $"{b.BagId} was successfully deleted from the database";
        }


    }
}
