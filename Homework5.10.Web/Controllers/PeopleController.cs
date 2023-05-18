using Homework5._10.Data;
using Homework5._10.Web.Models;
using Microsoft.AspNetCore.Mvc;

namespace Homework5._10.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeopleController : ControllerBase
    {
        private readonly string _connectionString;
        public PeopleController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }
        [Route("getall")]
        public List<Person> GetAll()
        {
            var pr = new PeopleRepository(_connectionString);
            return pr.GetAll();
        }
        [HttpPost]
        [Route("addperson")]
        public void AddPerson(Person person)
        {
            var pr = new PeopleRepository(_connectionString);
            pr.AddPerson(person);
        }

        [HttpPost]
        [Route("updateperson")]
        public void UpdatePerson(Person person)
        {
            var pr = new PeopleRepository(_connectionString);
            pr.UpdatePerson(person);
        }
        [HttpPost]
        [Route("deletepeople")]
        public void DeletePeople(IdsViewModel ids)
        {
            var pr = new PeopleRepository(_connectionString);
            pr.DeletePeople(ids.Ids);
        }
    }
}
