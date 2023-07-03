using Microsoft.AspNetCore.Mvc;
using SAC;
using System.Data;
using System.Data.SqlClient;

[ApiController]
[Route("api/[controller]")]
public class LoginController : ControllerBase
{

    private string connectionString = "Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=SAC;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False";

    [HttpPost]
    public IActionResult Post([FromBody] LoginRequest request)
    {
        string queryString = "SELECT * FROM Users WHERE Login = @Login AND Password = @Password;";

        using (SqlConnection connection = new SqlConnection(connectionString))
        {
            
            SqlParameter login = new SqlParameter("@Login", System.Data.SqlDbType.NChar);
            login.Value = request.Login;
            HttpContext.Session.SetString("Login", request.Login);

            SqlParameter password = new SqlParameter("@Password", System.Data.SqlDbType.NChar);
            password.Value = request.Password;
            HttpContext.Session.SetString("Password", request.Password);

            SqlCommand command = new SqlCommand(queryString, connection);
            command.Parameters.AddRange(new SqlParameter[] { login, password });

            try 
            {
                connection.Open();
                SqlDataReader reader = command.ExecuteReader();

                if (reader.HasRows) 
                {
                    Console.WriteLine($"Mamy to");

                    while (reader.Read())
                    {
                        HttpContext.Session.SetString("ID", Convert.ToString(reader["Id"]));
                        Console.WriteLine((string)reader["Login"] + " " + (string)reader["Password"]);
                    }

                    connection.Close();
                    return Ok("Login successful");

                }
                else
                {
                    Console.WriteLine("Nie mamy tego");
                }
            } 
            catch(Exception e) 
            {
                Console.WriteLine(e.Message);
            }
            connection.Close();
        }
        return BadRequest("Invalid login credentials");

       
    }
}
