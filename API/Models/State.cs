using System.Text.Json.Serialization;

namespace XC.Models;

public class State
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public string Code { get; set; } = "";
    public int CountryId { get; set; }
    
    [JsonIgnore]
    public Country? Country { get; set; }
}
