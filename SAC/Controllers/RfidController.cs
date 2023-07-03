using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;

namespace SAC.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RFIDController : ControllerBase
    {
        private string connectionString = "Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=SAC;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False";


        [HttpPost]
        public IActionResult Post([FromBody] RFIDDTO request)
        {
            string queryString = "SELECT * FROM Users WHERE id = @id AND RFID = @rfid";

            var id_string = HttpContext.Session.GetString("ID");

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlParameter sql_id = new SqlParameter("@id", System.Data.SqlDbType.Int);
                sql_id.Value = int.Parse(id_string);

                SqlParameter sql_rfid = new SqlParameter("@rfid", System.Data.SqlDbType.BigInt);
                sql_rfid.Value = long.Parse(request.id);

                SqlCommand command = new SqlCommand(queryString, connection);
                command.Parameters.AddRange(new SqlParameter[] { sql_id, sql_rfid });

                try
                {
                    connection.Open();
                    SqlDataReader reader = command.ExecuteReader();

                    if (reader.HasRows)
                    {
                        Console.WriteLine($"User with RFID:{id_string} exist in Databaze");
                        connection.Close();
                        return Ok("RFID exist in Databaze");

                    }
                    else
                    {
                        Console.WriteLine($"User with RFID:{id_string} Not exist in Databaze");
                    }
                }
                catch (Exception e)
                {
                    Console.WriteLine(e.Message);
                }
                connection.Close();
            }

            return BadRequest("This RFID is not existing");
        }
    }
}
