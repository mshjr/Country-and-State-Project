using System.Text.Json.Serialization;

namespace XC.Models;

public class Country
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public string Code { get; set; } = "";
    
    [JsonIgnore]
    public virtual IEnumerable<State>? States { get; set; }
}
