using Microsoft.EntityFrameworkCore;
    
namespace Homework5._10.Data
{
    public class PeopleRepository
    {
        private readonly string _connectionString;
        public PeopleRepository(string connectionString)
        {
            _connectionString = connectionString;
        }
        public void AddPerson(Person person)
        {
            using var context = new PeopleDbContext(_connectionString);
            context.People.Add(person);
            context.SaveChanges();
        }
        public List<Person> GetAll()
        {
            using var context = new PeopleDbContext(_connectionString);
            return context.People.OrderBy(p => p.LastName).ToList();
        }
        public void UpdatePerson(Person person)

        {
            if (person != null)
            {
                using var context = new PeopleDbContext(_connectionString);
                context.People.Attach(person);
                context.Entry(person).State = EntityState.Modified;
                context.SaveChanges();
            }

        }
        public void DeletePeople(List<int> ids)
        {
            foreach (int id in ids)
            {
                var person = GetById(id);
                if (person != null)
                {
                    using var context = new PeopleDbContext(_connectionString);
                    context.People.Remove(person);
                    context.SaveChanges();
                }
            }
        }
        private Person GetById(int id)
        {
            using var context = new PeopleDbContext(_connectionString);
            return context.People.FirstOrDefault(p => p.Id == id);
        }
    }
}
