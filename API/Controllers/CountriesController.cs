using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using XC.Models;

namespace api.Controllers
{
    [Route("api/Countries")]
    [ApiController]
    public class CountriesController : ControllerBase
    {
        private readonly Context _context;

        public CountriesController(Context context)
        {
            _context = context;
        }

        // GET: api/Countries
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Country>>> GetCountries()
        {
            if (_context.Countries == null)
            {
                return NotFound();
            }
            return await _context.Countries.ToListAsync();
        }

        // GET: api/Countries/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Country>> GetCountry(int id)
        {
            if (_context.Countries == null)
            {
                return NotFound();
            }
            var country = await _context.Countries.FindAsync(id);

            if (country == null)
            {
                return NotFound();
            }

            return country;
        }

        [HttpGet("{code}/states")]
        public async Task<ActionResult<IEnumerable<State>>> GetStates(string? code)
        {
            if (_context.States == null)
            {
                return NotFound();
            }

            return await _context.States
                                 .Where(s => s.Country.Code == code)
                                 .ToListAsync();
        }

        // POST: api/Countries
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Country>> PostCountry(Country country)
        {
            if (_context.Countries == null)
            {
                return Problem("Entity set 'CountryContext.Countries'  is null.");
            }

            if (_context.Countries.Any<Country>(c => c.Code == country.Code)) {
                return Problem(country.Code + " code already exists!");
            }

            var newCountry = new Country
            {
                Name = country.Name,
                Code = country.Code
            };

            _context.Countries.Add(newCountry);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCountry), new { id = newCountry.Id }, newCountry);
        }
    }
}
