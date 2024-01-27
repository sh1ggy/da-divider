using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Divider.Models;

public class Night : BaseEntity
{
  public DateTime Date { get; set; }

  [ForeignKey("PlaceIds")]
  public required int[] PlaceIds { get; set; }
}