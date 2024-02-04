using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Divider.Models;

public class Night : BaseEntity
{
  public required DateTime Date { get; set; }

  [ForeignKey("PlaceIds")]
  public int[]? PlaceIds { get; set; }
}